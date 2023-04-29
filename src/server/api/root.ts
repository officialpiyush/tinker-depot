import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { twilioAuthRouter } from "./routers/twilio/auth";
import { usersRouter } from "./routers/users";
import { roomsRouter } from "./routers/rooms";
import { twilioRoomsRouter } from "./routers/twilio/rooms";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  users: usersRouter,
  rooms: roomsRouter,
  twilioAuth: twilioAuthRouter,
  twilioRooms: twilioRoomsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
