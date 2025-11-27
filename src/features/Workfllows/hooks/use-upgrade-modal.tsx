'use client'
import React, { useState } from 'react'
import { trpc } from '@/trpc/server'
import { UpgradeModal } from '@/components/UpgradeModal'
import { useTRPC } from '@/trpc/client'
import { TRPCClientError } from '@trpc/client'

const useUpgradeModal = () => {
    const [isOpen, setIsOpen] = useState(false)


    const handleError = (error: unknown) => {
        if (error instanceof TRPCClientError) {
            if (error.data.code === 'FORBIDDEN') {
                setIsOpen(true)
            }
            return true;
        }

        return false;
    }

    const modal = <UpgradeModal open={isOpen} setOpen={setIsOpen} />

    return { handleError, modal }
}

export default useUpgradeModal
