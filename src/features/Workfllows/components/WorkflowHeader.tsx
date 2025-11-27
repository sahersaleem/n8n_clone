'use client'

import { EntityHeader } from "@/components/EntityComponents"
import { useCreateWorkflow } from "../hooks/use-workflows";
import useUpgradeModal from "../hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";

export const WorkflowHeader = ({ disabled }: { disabled?: boolean }) => {
    const router = useRouter();
    const createWorkflow = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModal()


    const handleCreateWorkflow = () => {
        createWorkflow.mutate(undefined, {
            onError: (error) => {
                handleError(error);
            },
            onSuccess: (data) => {
                router.push(`/workflows/${data?.id}`);
            }
        });
    }
    return (
        <>
            {modal}
            <EntityHeader
                title='Workflows'
                description='Automate tasks and processes with workflows.'
                newButtonLabel='New Workflow'
                onNew={() => { handleCreateWorkflow() }}
                disabled={disabled}
                isCreating={createWorkflow.isPending}

            />
        </>
    )
}
