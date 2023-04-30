import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const creatorsRouter = createTRPCRouter({
  getCreator: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
        const {userId} = input;

        const requestUserId = ctx.session.user.id

        const creatorData = await ctx.prisma.creator.findUnique({
            where: {
                userId
            },
            select: {
                available: true,
                users: {
                    where: {
                        id: requestUserId
                    }
                }
            }
        });

        console.log(creatorData)

        if (!creatorData) {
            await ctx.prisma.creator.create({
                data: {
                    userId,
                    available: false
                }
            });

            return {
                available: false
            }
        } else {
            return {
                available: creatorData.available
            }
        }
    }),

    addToNotification: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
        const {userId} = input;

        const requestUserId = ctx.session.user.id

        await ctx.prisma.creator.update({
            where: {
                userId
            },
            data: {
                users: {
                    connect: {
                        id: requestUserId
                    }
                }
            }
        })


        return {
            success: true
        }
    }),
});
