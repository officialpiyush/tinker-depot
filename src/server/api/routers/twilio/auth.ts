import { Twilio } from "twilio";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import validator from "validator";
import { env } from "~/env.mjs";

const twilioClient = new Twilio();

export const twilioAuthRouter = createTRPCRouter({
  sendOTP: publicProcedure
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

  verifyOTP: publicProcedure
    .input(
      z.object({
        phoneNumber: z.string().refine(validator.isMobilePhone),
        verificationCode: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { phoneNumber, verificationCode } = input;
      const verificationCheck = await twilioClient.verify.v2
        .services(env.TWILIO_SERVICE_SID)
        .verificationChecks.create({
          to: phoneNumber,
          code: verificationCode,
        });

      return {
        status: verificationCheck.status,
      };
    }),
});
