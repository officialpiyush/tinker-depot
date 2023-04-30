import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const chatRouter = createTRPCRouter({
  storeChat: protectedProcedure
    .input(z.object({ room: z.string(), message: z.string() }))
    .query(async ({ input, ctx }) => {
      const { room, message } = input;

      const userId = ctx.session.user.id;

      await ctx.prisma.chats.create({
        data: {
          roomId: room,
          userId,
          message,
        },
      });

      return {
        success: true,
      };
    }),

  getMessages: protectedProcedure
    .input(z.object({ room: z.string() }))
    .query(async ({ input, ctx }) => {
      const { room } = input;

      const messages = await ctx.prisma.chats.findMany({
        where: {
          roomId: room,
        },
        select: {
          message: true,
          user: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });

      return {
        messages,
      };
    }),
});
