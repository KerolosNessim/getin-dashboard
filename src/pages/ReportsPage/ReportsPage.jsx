// Financial Dashboard Page (POS System)
// Theme inspired by the image you provided (light grey background, clean cards, soft shadows)
// Using shadcn/ui components for Cards, Tabs, and Buttons
// All sections include comments for easy modification

import FinanceDtailes from "@/components/FinanceDetailes/FinanceDtailes";
import FinanceReport from "@/components/FinanceReport/FinanceReport";
import SectionHeader from "@/components/SctionHeader/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function ReportsPage() {
  const tabStyle = "bg-main-gold text-main-green text-base  h-12! data-[state=active]:bg-main-green data-[state=active]:text-main-gold"
  const reports = [
    "Business Reports",
    "Product Reports",
    "Daily Settlement",
    "Shift Handover",
    "Reconciliation Differences"
  ];
  return (
    <div >
      {/* Header Section */}
      <SectionHeader title="Transactions" />

      {/* Tabs - Like the Chinese UI (Today / Yesterday / This Week / This Month / etc.) */}
      <Tabs defaultValue={reports[0]} className="w-full   ">
        <TabsList className=" gap-2 bg-main-gold/50 p-2 rounded-lg">
          {reports.map((tab) => (
            <TabsTrigger className={tabStyle} value={tab}>{tab?.charAt(0).toUpperCase() + tab?.slice(1)}</TabsTrigger>
          ))}
        </TabsList>

        {/* Main Dashboard Content */}
        <TabsContent value={reports[0]}>
          <FinanceReport  />
        </TabsContent>
      </Tabs>
    </div>
  );
}
