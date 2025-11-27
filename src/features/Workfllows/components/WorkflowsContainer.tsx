import { EntityContainer } from "@/components/EntityComponents"
import { WorkflowHeader } from "./WorkflowHeader"

export const WorkflowsContainer = (
    { children }: { children: React.ReactNode }
) => {
    return (
        <EntityContainer
            header={<WorkflowHeader />}
            pagination={<></>}
            search={<> </>}

        >
            {children}
        </EntityContainer>
    )

}