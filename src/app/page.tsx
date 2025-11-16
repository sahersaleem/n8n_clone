
// import { getQueryClient, trpc } from "@/trpc/server";
// import Client from "./client";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { Suspense } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import Logout from "./logout";


export default async function Home() {

  await requireAuth();
  const users = await caller.getUser();
  // const queryClient = getQueryClient();
  // void queryClient.prefetchQuery(trpc.getUser.queryOptions());
  // const { data } =  authClient.useSession()

  return (
  <div>
    Protected route
    <pre>{JSON.stringify(users, null, 2)}</pre>
    <Logout/>
    </div>

  );
}

