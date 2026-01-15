import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RawMaterialsCheck from "../RawMaterialsCheck/RawMaterialsCheck";
import { useQuery } from "@tanstack/react-query";
import { getAllReports } from "@/api/reportts";


const DailySettlementRport = () => {
  const tabStyle = "bg-main-green text-main-gold text-base  h-12! data-[state=active]:bg-main-gold data-[state=active]:text-main-green"
  const tabs = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "This Week", value: "this_week" },
    { label: "This Month", value: "this_month" },
    { label: "This Year", value: "this_year" },
  ];
  const [filter, setFilter] = React.useState("today");

  const { data: reports } = useQuery({
    queryKey: ["all-reports", filter],
    queryFn: () => getAllReports(filter),
  });

  const kpis = reports?.kpis;

  return (
    <div className="space-y-6">
      <Tabs defaultValue={tabs[0].value} className="w-full">
        <TabsList className="gap-2 p-2 rounded-lg bg-main-green/30">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={tabStyle}
              value={tab.value}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* ===========================
          Summary Section
      ============================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-lg font-semibold">
              Total Sales Today (₺)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-2xl font-bold">
            {kpis?.sales_amount?.value || 0}
            <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className={kpis?.sales_amount?.change_yesterday?.startsWith("-") ? "text-red-600" : "text-green-600"}>{kpis?.sales_amount?.change_yesterday || 0}</span></p>
          </CardContent>
        </Card>
        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-lg font-semibold">
              Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-2xl font-bold">
            {kpis?.orders?.value || 0}
            <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className={kpis?.orders?.change_yesterday < 0 ? "text-red-600" : "text-green-600"}>{kpis?.orders?.change_yesterday || 0}</span></p>
          </CardContent>
        </Card>
        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-lg font-semibold">
              Total Discounts Today (₺)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-2xl font-bold">
            {kpis?.discount_amount?.value || 0}
            <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className={kpis?.discount_amount?.change_yesterday?.startsWith("-") ? "text-red-600" : "text-green-600"}>{kpis?.discount_amount?.change_yesterday || 0}</span></p>
          </CardContent>
        </Card>
        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-lg font-semibold">
              AVG Order (₺)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-2xl font-bold">
            {kpis?.avg_order?.value || 0}
            <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className={kpis?.avg_order?.change_yesterday?.startsWith("-") ? "text-red-600" : "text-green-600"}>{kpis?.avg_order?.change_yesterday || 0}</span></p>
          </CardContent>
        </Card>
      </div>
      {/* ===========================
          Raw Materials Check
      ============================ */}
      <RawMaterialsCheck />


    </div>
  );
};

export default DailySettlementRport
