"use client";
import React, { use } from 'react'
import { useSuspenseWorkflows } from '../hooks/use-workflows';


const WorkflowsList = () => {
    const workflowsList = useSuspenseWorkflows();
    return (
        <div className='flex flex-1 items-center justify-center'>
            {JSON.stringify(workflowsList.data)}
        </div>
    )
}

export default WorkflowsList



