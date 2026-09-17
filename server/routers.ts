import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { addActivity, completeActivity, readLocalState } from "./localStore";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  local: router({
    state: publicProcedure.query(() => readLocalState()),
    createActivity: publicProcedure
      .input(z.object({ title: z.string().trim().min(1).max(80), subject: z.string().trim().min(1).max(40) }))
      .mutation(({ input }) => addActivity(input.title, input.subject)),
    completeActivity: publicProcedure
      .input(z.object({ id: z.string().min(1) }))
      .mutation(({ input }) => completeActivity(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
