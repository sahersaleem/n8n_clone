import React, { Suspense } from 'react'
import { requireAuth } from '@/lib/auth-utils'
import { prefetchWorkflows } from '@/features/Workfllows/server/prefetch'
import { ErrorBoundary } from 'react-error-boundary'
import { HydrateClient } from '@/trpc/server'
import { WorkflowsContainer } from '@/features/Workfllows/components/WorkflowsContainer'
import WorkflowsList, { WorkflowsError, WorkflowsLoading } from '@/features/Workfllows/components/Workflows'
import { SearchParams } from 'nuqs'
import { workflowsParamsLoader } from '@/features/Workfllows/server/params-loader'

type Props = {
  searchParams: Promise<SearchParams>
}


const page = async ({ searchParams }: Props) => {

  await requireAuth()
  const params = await workflowsParamsLoader(searchParams);
  prefetchWorkflows(params);


  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorkflowsError/>}>
          <Suspense fallback={<WorkflowsLoading />}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  )
}

export default page
