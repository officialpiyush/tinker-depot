import { Twilio } from "twilio";
import { z } from "zod";

import AccessToken, { VideoGrant } from "twilio/lib/jwt/AccessToken";
import { env } from "~/env.mjs";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const twilioClient = new Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

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
            type: "go",
          });
        } else {
          throw error;
        }
      }

      const token = new AccessToken(
        env.TWILIO_ACCOUNT_SID,
        env.TWILIO_SERVICE_SID,
        env.TWILIO_AUTH_TOKEN,
        {
          identity: userId,
        }
      );

      const videoGrant = new VideoGrant({
        room: id,
      });

      token.addGrant(videoGrant);

      return {
        token: token.toJwt(),
        roomId: id,
        startDate,
      };
    }),
});
