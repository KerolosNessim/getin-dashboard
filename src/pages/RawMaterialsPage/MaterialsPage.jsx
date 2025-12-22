import { HistoryTable } from "@/components/HistoryTable/HistoryTable"
import { DataTable } from "@/components/RawMateriales/RawMaterialsTables"
import { RequsetsTable } from "@/components/RawMateriales/RequsetsTable"
import SectionHeader from "@/components/SctionHeader/SectionHeader"
import { inventory, inventoryHistory, materialsRequests } from "@/data"
import { HistoryColumns, RequsetsColumns, RowMaterialsColumns } from "../../components/RawMateriales/Columns"
const MaterialsPage = () => {
  return (
    <div className="space-y-8 pb-10 ">
      <SectionHeader title="Raw Materials" />
      <DataTable columns={RowMaterialsColumns} data={inventory} />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-main-green flex items-center gap-2">
          Internal Material Requests
        </h2>
        <RequsetsTable columns={RequsetsColumns} data={materialsRequests} />
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-main-green flex items-center gap-2">
          Material History
        </h2>
        <HistoryTable columns={ HistoryColumns} data={inventoryHistory} />
      </section>
    </div>
  )
}

export default MaterialsPage