import { ExternalTable } from '@/components/ExternalMateriales/ExternalTable';
import { ExternalHistoryColumns, ExternalMaterialsColumns, ExternalRequsetsColumns } from '@/components/ExternalMateriales/columns';
import { HistoryTable } from '@/components/HistoryTable/HistoryTable';
import { RequsetsTable } from '@/components/RawMateriales/RequsetsTable';
import SectionHeader from '@/components/SctionHeader/SectionHeader';
import { getExternalMaterialHistory, getExternalMaterialRequests, getExternalMaterials } from '@/api/externalMaterials';
import { useQuery } from '@tanstack/react-query';


export default function ExternalMaterialsPage() {

  // Requests State
  const { data: externalMaterials } = useQuery({
    queryKey: ["externalMaterials"],
    queryFn: getExternalMaterials
  })
  const { data: externalHistory } = useQuery({
    queryKey: ["externalHistory"],
    queryFn: getExternalMaterialHistory
  })
  const { data: externalRequests } = useQuery({
    queryKey: ["externalRequests"],
    queryFn: getExternalMaterialRequests
  })




  return (
    <div className="space-y-8 pb-10">
      <SectionHeader title="External Materials" />
      <ExternalTable columns={ExternalMaterialsColumns} data={externalMaterials ||[]} />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-main-green flex items-center gap-2">
          External Material Requests
        </h2>
        <RequsetsTable columns={ExternalRequsetsColumns} data={externalRequests||[]} />
      </section>

      {/* Inventory Movement History Table */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-main-green flex items-center gap-2">
          External Material History
        </h2>
        <HistoryTable columns={ExternalHistoryColumns} data={externalHistory||[]} />
      </section>
    </div>
  );
}

