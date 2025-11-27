import React, { Suspense } from 'react'
import { requireAuth } from '@/lib/auth-utils'
import { prefetchWorkflows } from '@/features/Workfllows/server/prefetch'
import { ErrorBoundary } from 'react-error-boundary'
import { HydrateClient } from '@/trpc/server'
import { WorkflowsContainer } from '@/features/Workfllows/components/WorkflowsContainer'
import WorkflowsList from '@/features/Workfllows/components/Workflows'

const page = async () => {
  await requireAuth()
  prefetchWorkflows();
  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          <Suspense fallback={<div>Loading workflows...</div>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  )
}

export default page
