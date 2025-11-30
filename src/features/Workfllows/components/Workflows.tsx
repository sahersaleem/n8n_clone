"use client";
import React, { use } from 'react'
import { useSuspenseWorkflows } from '../hooks/use-workflows';
import { EntityPagination, EntitySearch } from '@/components/EntityComponents';
import { useWorkflowsParams } from '../hooks/use-workflows-params';
import { useEntitySearch } from '@/hooks/use-entity-search';

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



const WorkflowsList = () => {
    const workflowsList = useSuspenseWorkflows();
    return (
        <div className='flex flex-1 items-center justify-center'>
            {JSON.stringify(workflowsList.data)}
        </div>
    )
}

export default WorkflowsList



