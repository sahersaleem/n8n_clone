import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

interface PageProps {
    params: Promise<{
        workflowsId: string
    }>
}


const page = async ({ params }: PageProps) => {
    await requireAuth()
    const { workflowsId } = (await params)
    return (
        <div>
            workflows Id:{workflowsId}
        </div>
    )
}

export default page
