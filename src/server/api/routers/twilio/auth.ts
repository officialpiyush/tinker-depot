import { Twilio } from "twilio";
import { z } from "zod";

import validator from "validator";
import { env } from "~/env.mjs";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const twilioClient = new Twilio();

export const twilioAuthRouter = createTRPCRouter({
  sendOTP: protectedProcedure
    .input(
      z.object({ phoneNumber: z.string().refine(validator.isMobilePhone) })
    )
    .mutation(async ({ input }) => {
      console.log("input", input);
      const { phoneNumber } = input;
      const verificationService = await twilioClient.verify.v2
        .services(env.TWILIO_SERVICE_SID)
        .verifications.create({ to: phoneNumber, channel: "sms" });

      return {
        verificationSid: verificationService.sid,
      };
    }),

  verifyOTP: protectedProcedure
    .input(
      z.object({
        phoneNumber: z.string().refine(validator.isMobilePhone),
        verificationCode: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { phoneNumber, verificationCode } = input;
      const verificationCheck = await twilioClient.verify.v2
        .services(env.TWILIO_SERVICE_SID)
        .verificationChecks.create({
          to: phoneNumber,
          code: verificationCode,
        });

      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          mobileNumber: phoneNumber,
          mobileVerified:
            verificationCheck.status === "approved" ? new Date() : null,
        },
      });

      return {
        userId: ctx.session.user.id,
        status: verificationCheck.status,
      };
    }),
});
