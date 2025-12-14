"use client";
import React, { use } from 'react'
import { useCreateWorkflow, useRemoveWorkflows, useSuspenseWorkflows } from '../hooks/use-workflows';
import { EmptyView, EntityErrorView, EntityItem, EntityList, EntityLoadingView, EntityPagination, EntitySearch } from '@/components/EntityComponents';
import { useWorkflowsParams } from '../hooks/use-workflows-params';
import { useEntitySearch } from '@/hooks/use-entity-search';
import useUpgradeModal from '../hooks/use-upgrade-modal';
import { useRouter } from 'next/router';
import type { Workflow } from '@/generated/prisma/client';
import { WorkflowIcon } from 'lucide-react';
import { formatDistanceToNow } from "date-fns"

export const WorkFlowSearch = () => {
    const [params, setParams] = useWorkflowsParams()
    const { searchValue, onSearchChange } = useEntitySearch({ params, setParams })
    return <EntitySearch
        value={searchValue}
        onChange={onSearchChange} placeholder='Search workflows..' />

}

export const WorkFlowPagination = () => {
    const workflows = useSuspenseWorkflows()
    const [params, setParams] = useWorkflowsParams()

    return (
        <EntityPagination
            disabled={workflows.isFetching}
            totalPages={workflows.data.totalPages}
            page={workflows.data.page}
            onPageChange={(page) => { setParams({ ...params, page }) }}


        />
    )
}

export const WorkflowsLoading = () => {
    return <EntityLoadingView message={"Loading workflows..."} />
}

export const WorkflowsError = () => {
    return <EntityErrorView message='Error Loading Workflows' />
}

export const WorkflowsEmpty = () => {
    const createWorkflow = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModal()
    const router = useRouter()
    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onError: (error) => {
                handleError(error);
            }, onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            }
        })
    }
    return (
        <>
            {modal}
            <EmptyView message="You haven't created any workflow yet.Get started by creating your first workflow." onNew={handleCreate} />
        </>
    )
}



export const WorkflowItem = ({ data }: { data: Workflow }) => {

    const removeWorkflow = useRemoveWorkflows()

    const handleRemoveWorkflows = () => {

        return removeWorkflow.mutate({ id: data.id })
    }

    return (
        <EntityItem
            href={`/workflows/${data.id}`}
            title={data.name}
            subtitle={<>Updated: {formatDistanceToNow(data.updatedAt, { addSuffix: true })} {" "} &bull; Created at {" "}: {formatDistanceToNow(data.createdAt, { addSuffix: true })}</>}
            image={<div className='size-8 flex items-center justify-center'><WorkflowIcon className='size-5 text-muted-foreground' /></div>}
            className=''
            onRemove={() => { handleRemoveWorkflows() }}
            isRemoving={false}

        />

    )
}



const WorkflowsList = () => {
    const workflowsList = useSuspenseWorkflows();
    if (workflowsList.data.items.length === 0) {
        return <WorkflowsEmpty />
    }
    return (
        <EntityList
            items={workflowsList.data.items}
            getKey={(workflow) => workflow.id}
            renderItem={(workflow) => <WorkflowItem data={workflow} />}
            emptyView={<WorkflowsEmpty />}

        />

    )
}








export default WorkflowsList



