import { z } from "zod";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "../init";
import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { TRPCError } from "@trpc/server";

export const appRouter = createTRPCRouter({
  //use AI function calling thriugh inngest.
  useAI: premiumProcedure.mutation(async ({ ctx }) => {
    await inngest.send({
      name: "execute.ai",
    });
    return { success: true, message: "JOb QUEUED" };
  }),

  //returning workflow though protected procedure
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),

  //creating workflow thorough inngesr hello world function on succes return job queued
  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "Saher",
      },
    });

    return { success: true, message: "JOb QUEUED" };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
