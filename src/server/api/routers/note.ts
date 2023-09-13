/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const noteRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findMany({
        where: {
          topicId: input.topicId,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), topicId: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.note.create({
        data: {
          title: input.title,
          topicId: input.topicId,
          content: input.content,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        topicId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, title, content, topicId } = input;
      const existingNote = await ctx.prisma.note.findUnique({
        where: {
          id,
        },
      });

      if (!existingNote) {
        throw new Error(`No se encontró una nota con el ID: ${id}`);
      }
      if (topicId !== existingNote.topicId) {
        throw new Error("No puedes cambiar el tópico de una nota.");
      }
      const updatedNote = await ctx.prisma.note.update({
        where: {
          id,
        },
        data: {
          title,
          content,
        },
      });
      return updatedNote;
    }),
});
