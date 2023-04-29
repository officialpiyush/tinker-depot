import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const roomsRouter = createTRPCRouter({
  getRoomId: protectedProcedure
    .input(z.object({ talkingWith: z.string() }))
    .query(async ({ input, ctx }) => {
      const { talkingWith } = input;
      const { id: userId } = ctx.session.user;

      let id: string;
      let startedAt: Date;

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
        startedAt = createdRoom.startedAt;
      } else if (roomExists[0]) {
        id = roomExists[0].id;
        startedAt = roomExists[0].startedAt;
      } else {
        throw new Error("No ID found");
      }

      return {
        roomId: id,
        startedAt,
      };
    }),
});
