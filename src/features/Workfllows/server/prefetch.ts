
import type { inferInput } from "@trpc/tanstack-react-query";
import { trpc, prefetch } from "@/trpc/server";

// Infer the input type for the getMany workflows procedure
type Input = inferInput<typeof trpc.workflows.getMany>

// Function to prefetch workflows data
export const prefetchWorkflows = async (params: Input) => {
  return prefetch(trpc.workflows.getMany.queryOptions(params));
};