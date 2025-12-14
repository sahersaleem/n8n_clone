"use client";

import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();
  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
};

export const useCreateWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [params] = useWorkflowsParams();

  return useMutation(
    trpc.workflows.createWorkflow.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(
          trpc.workflows.getMany.queryOptions({ ...params })
        );
        toast.success(`Workflow "${data.name}" created successfully.`);
      },
      onError: (error) => {
        toast.error(`Failed to create workflow: ${error.message}`);
      },
    })
  );
};

export const useRemoveWorkflows = () => {
  const [params] = useWorkflowsParams();
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.deleteWorkflow.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" deleted successfully.`);

        queryClient.invalidateQueries(
          trpc.workflows.getMany.queryOptions({ ...params })
        );
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryFilter({ id: data.id })
        );
      },
    })
  );
};
