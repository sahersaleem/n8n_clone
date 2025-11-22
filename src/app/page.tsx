
"use client"
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import Logout from "./logout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";


export default function Home() {


  const trpc = useTRPC()
  const { data } = useQuery(trpc.getWorkflows.queryOptions())
  const queryClient = useQueryClient();
  
  const mutate = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess() {
     toast("Workflow creation queued")
    }
  }))

  return (
    <div>
      Protected route
      <pre>{JSON.stringify(data)}</pre>
      <Button onClick={() => mutate.mutate()} disabled={mutate.isPending}>Create Workflow</Button>
      <Logout />
    </div>

  );
}

