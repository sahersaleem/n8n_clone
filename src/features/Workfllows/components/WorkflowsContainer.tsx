import { EntityContainer } from "@/components/EntityComponents"
import { WorkflowHeader } from "./WorkflowHeader"
import { WorkFlowPagination, WorkFlowSearch } from "./Workflows"

export const WorkflowsContainer = (
    { children }: { children: React.ReactNode }
) => {
    return (
        <EntityContainer
            header={<WorkflowHeader />}
            pagination={<WorkFlowPagination />}
            search={<WorkFlowSearch />}

        >
            {children}
        </EntityContainer>
    )

}