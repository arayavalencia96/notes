import { createTRPCRouter } from "~/server/api/trpc";
import { topicRouter } from "./routers/topic";
import { noteRouter } from "./routers/note";

export const appRouter = createTRPCRouter({
  topic: topicRouter,
  note: noteRouter,
});

export type AppRouter = typeof appRouter;
