import prisma from "@/lib/db";
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { generateSlug } from "random-word-slugs";
import z from "zod";

export const workflowsRouter = createTRPCRouter({
  // returning workflow though protected procedure
  createWorkflow: premiumProcedure.mutation(async ({ ctx }) => {
    return prisma.workflow.create({
      data: {
        name: generateSlug(3, { format: "title" }),
        userId: ctx.session.user.id,
      },
    });
  }),

  //deleting workflow though protected procedure
  deeteWorkflow: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return prisma.workflow.delete({
        where: {
          userId: ctx.session.user.id,
          id: input.userId,
        },
      });
    }),

  //updating workflow name though protected procedure
  updateWorkflowName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return prisma.workflow.update({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        data: {
          name: input.name,
        },
      });
    }),

  //getting single workflow though protected procedure
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return prisma.workflow.findUnique({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),

  //getting all workflows though protected procedure
  getMany: protectedProcedure.query(async ({ ctx }) => {
    return prisma.workflow.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
