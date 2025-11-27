"use client"

import React from 'react'
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const page = () => {

    const trpc: any = useTRPC()
    const mutate = useMutation(trpc.useAI.mutationOptions({
        onSuccess: () => {
            toast.success("Job QUeued")
        },
        onError: () => {
            toast.error("Error Occurred")
        }
    }))


    return (
        <div>
            <Button onClick={() => mutate.mutate()} disabled={mutate.isPending}>Test Ai</Button>
        </div>

    )
}

export default page
