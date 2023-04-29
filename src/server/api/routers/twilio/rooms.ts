import { Twilio } from "twilio";
import { z } from "zod";

import AccessToken, { VideoGrant } from "twilio/lib/jwt/AccessToken";
import { env } from "~/env.mjs";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { nanoid } from "nanoid";

const twilioClient = new Twilio();

export const twilioRoomsRouter = createTRPCRouter({
  getAccessTokenForRoom: protectedProcedure
    .input(z.object({ talkingWith: z.string() }))
    .query(async ({ input, ctx }) => {
      console.log("input", input);
      const { talkingWith } = input;
      const { id: userId } = ctx.session.user;

      let id: string;
      let startDate: Date;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const roomExists = await ctx.prisma.rooms.findMany({
        where: {
          OR: [
            {
              firstUser: userId,
              secondUser: talkingWith,
            },
            {
              firstUser: talkingWith,
              secondUser: userId,
            },
          ],
        },
        select: {
          id: true,
          startedAt: true,
        },
      });

      if (!roomExists || !roomExists.length) {
        const createdRoom = await ctx.prisma.rooms.create({
          data: {
            firstUser: userId,
            secondUser: talkingWith,
          },
        });

        id = createdRoom.id;
        startDate = createdRoom.startedAt;
      } else if (roomExists[0]) {
        id = roomExists[0].id;
        startDate = roomExists[0].startedAt;
      } else {
        throw new Error("No ID found");
      }

      try {
        await twilioClient.video.v1.rooms(id).fetch();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (error.code == 20404) {
          await twilioClient.video.v1.rooms.create({
            uniqueName: id,
            type: "group",
          });
        } else {
          throw error;
        }
      }

      const token = new AccessToken(
        env.TWILIO_ACCOUNT_SID,
        env.TWILIO_API_SID,
        env.TWILIO_API_SECRET,
        {
          identity: userId + nanoid(),
        }
      );

      const videoGrant = new VideoGrant();

      token.addGrant(videoGrant);

      return {
        token: token.toJwt(),
        roomId: id,
        startDate,
      };
    }),

  stopRoom: protectedProcedure
    .input(z.object({ roomId: z.string(), talkingWith: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { roomId, talkingWith } = input;
      const { id: userId } = ctx.session.user;

      const room = await ctx.prisma.rooms.findFirst({
        where: {
          id: roomId,
        },
      });

      if (!room) {
        throw new Error("Room not found");
      }

      const { firstUser, secondUser } = room;
      if (firstUser !== userId && secondUser !== userId) {
        throw new Error("User not in room");
      }

      if (secondUser !== talkingWith && firstUser !== talkingWith) {
        throw new Error("User not in room");
      }

      await twilioClient.video.v1.rooms(roomId).update({
        status: "completed",
      });

      await ctx.prisma.rooms.delete({
        where: {
          id: roomId,
        },
      });

      return true;
    }),
});
