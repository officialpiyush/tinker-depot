import { Twilio } from "twilio";
import { z } from "zod";
import { env } from "~/env.mjs";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const twilioClient = new Twilio();

export const creatorsRouter = createTRPCRouter({
  getCreator: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { userId } = input;

      const requestUserId = ctx.session.user.id;

      const creatorData = await ctx.prisma.creator.findUnique({
        where: {
          userId,
        },
        select: {
          available: true,
          users: {
            where: {
              id: requestUserId,
            },
          },
        },
      });

      console.log(creatorData);

      if (!creatorData) {
        await ctx.prisma.creator.create({
          data: {
            userId,
            available: false,
          },
        });

        return {
          available: false,
        };
      } else {
        return {
          available: creatorData.available,
        };
      }
    }),

  addToNotification: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { userId } = input;

      const requestUserId = ctx.session.user.id;

      await ctx.prisma.creator.update({
        where: {
          userId,
        },
        data: {
          users: {
            connect: {
              id: requestUserId,
            },
          },
        },
      });

      return {
        success: true,
      };
    }),

  toggleAvailability: protectedProcedure
    .input(z.object({ available: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const { available } = input;

      const requestUserId = ctx.session.user.id;

      await ctx.prisma.creator.update({
        where: {
          userId: requestUserId,
        },
        data: {
          available,
        },
      });

      const userNumbers = await ctx.prisma.creator.findUnique({
        where: {
          userId: requestUserId,
        },
        select: {
          users: {
            select: {
              mobileNumber: true,
            },
          },
        },
      });

      if (!userNumbers || !available) {
        return {
          success: true,
        };
      }

      const creatorName = await ctx.prisma.user.findUnique({
        where: {
          id: requestUserId,
        },
        select: {
          name: true,
        },
      });

      await Promise.all(
        userNumbers.users.map(async (user) => {
          await twilioClient.messages.create({
            body: `Creator ${creatorName?.name || "ghost"} is now ${
              available ? "available" : "unavailable"
            }\n\n<3 TinkerDepot`,
            from: env.TWILIO_PHONE_NUMBER,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            to: user.mobileNumber!,
          });
        })
      )

      await ctx.prisma.creator.update({
        where: {
          userId: requestUserId,
        }, 
        data: {
          users: {
            set: []
          },
        },
      })

      return {
        success: true,
      };
    }),

});
