// Financial Dashboard Page (POS System)
// Theme inspired by the image you provided (light grey background, clean cards, soft shadows)
// Using shadcn/ui components for Cards, Tabs, and Buttons
// All sections include comments for easy modification

import DailySettlementRport from "@/components/DailySettlementRport/DailySettlementRport";
import ExportBtn from "@/components/ExportBtn/ExportBtn";
import FinanceDtailes from "@/components/FinanceDetailes/FinanceDtailes";
import FinanceReport from "@/components/FinanceReport/FinanceReport";
import OperationsReports from "@/components/OperationsReports/OperationReports";
import ProductsReports from "@/components/ProductsReports/ProductsReports";
import SectionHeader from "@/components/SctionHeader/SectionHeader";
import ShiftHandoverRport from "@/components/ShiftHandoverRport/ShiftHandoverRport";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function ReportsPage() {
  const tabStyle = "bg-main-gold text-main-green text-base  h-12! data-[state=active]:bg-main-green data-[state=active]:text-main-gold"
  const reports = [
    "Financial Reports",
    "Operations Reports",
    "Products Reports",
    "Daily Settlement",
    "Shift Handover",
    // "Reconciliation Differences"
  ];
  return (
    <div className="pb-4">
      {/* Header Section */}
      <SectionHeader title="Reports" />

      {/* Tabs - Like the Chinese UI (Today / Yesterday / This Week / This Month / etc.) */}
      <Tabs defaultValue={reports[0]} className="w-full">
        <div className="flex items-center justify-between">
          <TabsList className=" gap-2 bg-main-gold/50 p-2 rounded-lg">
            {reports.map((tab) => (
              <TabsTrigger className={tabStyle} value={tab}>{tab?.charAt(0).toUpperCase() + tab?.slice(1)}</TabsTrigger>
            ))}
          </TabsList>
          <ExportBtn />
        </div>
        {/* Main Dashboard Content */}
        <TabsContent value={"Financial Reports"}>
          <FinanceReport />
        </TabsContent>
        <TabsContent value={"Operations Reports"}>
          <OperationsReports />
        </TabsContent>
        <TabsContent value={"Products Reports"}>
          <ProductsReports />
        </TabsContent>
        <TabsContent value={"Daily Settlement"}>
          <DailySettlementRport />
        </TabsContent>
        <TabsContent value={"Shift Handover"}>
          <ShiftHandoverRport />
        </TabsContent>
      </Tabs>
    </div>
  );
}
