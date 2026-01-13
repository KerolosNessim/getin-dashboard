import { getApprovalHistory, getMaterials, getMaterialsRequests } from "@/api/materials"
import { HistoryTable } from "@/components/HistoryTable/HistoryTable"
import { DataTable } from "@/components/RawMateriales/RawMaterialsTables"
import SectionHeader from "@/components/SctionHeader/SectionHeader"
import { useQuery } from "@tanstack/react-query"
import { HistoryColumns, RequsetsColumns, RowMaterialsColumns } from "../../components/RawMateriales/Columns"
import { RequsetsTable } from "@/components/RawMateriales/RequsetsTable"
const MaterialsPage = () => {
  const { data: materials } = useQuery({
    queryKey: ["materials"],
    queryFn: getMaterials
  })
  const { data: approvalHistory } = useQuery({
    queryKey: ["approvalHistory"],
    queryFn: getApprovalHistory
  })
  const { data: materialesRequests } = useQuery({
    queryKey: ["materialesRequests"],
    queryFn: getMaterialsRequests
  })
  
  return (
    <div className="space-y-8 pb-10 ">
      <SectionHeader title="Raw Materials" />
      <DataTable columns={RowMaterialsColumns} data={materials || []} />
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-main-green flex items-center gap-2">
          Internal Material Requests
        </h2>
        <RequsetsTable columns={RequsetsColumns} data={materialesRequests ||[]} />
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-main-green flex items-center gap-2">
          Material History
        </h2>
        <HistoryTable columns={HistoryColumns} data={approvalHistory||[]} />
      </section>
    </div>
  )
}

export default MaterialsPage