import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";
import validator from "validator";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    TWILIO_ACCOUNT_SID: z.string().min(1),
    TWILIO_AUTH_TOKEN: z.string().min(1),
    TWILIO_SERVICE_SID: z.string().min(1),
    TWILIO_API_SID: z.string().min(1),
    TWILIO_API_SECRET: z.string().min(1),
    TWILIO_PHONE_NUMBER: z.string().min(1).refine(validator.isMobilePhone),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string().min(1) : z.string().url()
    ),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
  },
  client: {},

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID,
    TWILIO_API_SID: process.env.TWILIO_API_SID,
    TWILIO_API_SECRET: process.env.TWILIO_API_SECRET,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
});
