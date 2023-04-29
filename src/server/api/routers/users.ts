import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getNameFromId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
        select: {
          name: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return {
        userName: user.name,
      };
    }),
});
