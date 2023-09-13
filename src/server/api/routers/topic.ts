/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.topic.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.topic.delete({
        where: {
          id: input.id,
        },
      });
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, title } = input;
      const existingTopic = await ctx.prisma.topic.findUnique({
        where: {
          id,
        },
      });
      if (!existingTopic) {
        throw new Error(`No se encontró un tópico con el ID: ${id}`);
      }
      const updatedTopic = await ctx.prisma.topic.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });
      return updatedTopic;
    }),
});
