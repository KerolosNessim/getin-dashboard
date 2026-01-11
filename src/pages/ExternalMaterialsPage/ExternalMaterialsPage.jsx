import { ExternalTable } from '@/components/ExternalMateriales/ExternalTable';
import { ExternalHistoryColumns, ExternalMaterialsColumns, ExternalRequsetsColumns } from '@/components/ExternalMateriales/columns';
import { HistoryTable } from '@/components/HistoryTable/HistoryTable';
import { RequsetsTable } from '@/components/RawMateriales/RequsetsTable';
import SectionHeader from '@/components/SctionHeader/SectionHeader';
import { externalHistory, externalMaterialsData, externalRequests } from '@/data';



export default function ExternalMaterialsPage() {

  // Requests State





  return (
    <div className="space-y-8 pb-10">
      <SectionHeader title="External Materials" />
      <ExternalTable columns={ExternalMaterialsColumns} data={externalMaterialsData} />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-main-green flex items-center gap-2">
          External Material Requests
        </h2>
        <RequsetsTable columns={ExternalRequsetsColumns} data={externalRequests} />
      </section>

      {/* Inventory Movement History Table */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-main-green flex items-center gap-2">
          External Material History
        </h2>
        <HistoryTable columns={ExternalHistoryColumns} data={externalHistory} />
      </section>
    </div>
  );
}

