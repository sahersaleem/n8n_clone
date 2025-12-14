import { Pagination } from "@/config/constant";
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
  deleteWorkflow: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return prisma.workflow.delete({
        where: {
          userId: ctx.session.user.id,
          id: input.id,
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
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(Pagination.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(Pagination.MIN_PAGE_SIZE)
          .max(Pagination.MAX_PAGE_SIZE)
          .default(Pagination.DEFAULT_PAGE_SIZE),
        search: z.string(""),
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page, search } = input;

      const [items, totalItems] = await Promise.all([
        prisma.workflow.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            userId: ctx.session.user.id,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        }),
        prisma.workflow.count({
          where: {
            userId: ctx.session.user.id,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        }),
      ]);

      const totalPages = Math.ceil(totalItems / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;
      return {
        items,
        page,
        pageSize,
        totalItems,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };
    }),
});
