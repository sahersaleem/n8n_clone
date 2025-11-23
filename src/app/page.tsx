
"use client"
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import Logout from "./logout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { use } from "react";


export default function Home() {


  const trpc = useTRPC()
  const { data } = useQuery(trpc.getWorkflows.queryOptions())
  const queryClient = useQueryClient();

  //mutation to create workflow 
  const mutate = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      toast.success("Workflow creation queued")
    },
    onError: () => {
      toast.error("Something went wrong.")
    }
  }))

  //For testing Ai using trpc protectted route
  const testAi = useMutation(trpc.useAI.mutationOptions({
    onSuccess() {
      toast("Text generating ququed!!")
    },
    onError: () => {
      toast.error("Something went wrong.")
    }
  }))
  return (
    <div>
      Protected route
      <pre>{JSON.stringify(data)}</pre>
      <Button onClick={() => testAi.mutate()} disabled={testAi.isPending}>Test Ai</Button>
      <Button onClick={() => mutate.mutate()} disabled={mutate.isPending}>Create Workflow</Button>
      <Logout />
    </div>

  );
}

