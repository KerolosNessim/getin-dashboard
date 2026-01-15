import { getOperationsReports } from '@/api/reportts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import OperationsDetailes from '../OperationsDetailes/OperationsDetailes';
const OperationsReports = () => {
  const tabStyle = "bg-main-green text-main-gold text-base  h-12! data-[state=active]:bg-main-gold data-[state=active]:text-main-green"
  const tabs = [
    {
      label: "Today",
      value: "today"
    },
    {
      label: "Yesterday",
      value: "yesterday"
    },
    {
      label: "This Week",
      value: "this_week"
    },
    {
      label: "This Month",
      value: "this_month"
    },
    {
      label: "This Year",
      value: "this_year"
    }
  ]
  const [filter, setFilter] = useState("today")
  const { data: reports } = useQuery({
    queryKey: ["operations-reports", filter],
    queryFn: () => getOperationsReports(filter),
  })
  return (
    <div>
      <Tabs defaultValue={tabs[0].value} className="w-full   ">
        <TabsList className=" gap-2 p-2 rounded-lg bg-main-green/30">
          {tabs?.map((tab) => (
            <TabsTrigger onClick={() => setFilter(tab?.value)} className={tabStyle} value={tab?.value}>{tab?.label}</TabsTrigger>
          ))}
        </TabsList>


        {/* Main Dashboard Content */}
        {
          tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <OperationsDetailes reports={reports} />
            </TabsContent>
          ))
        }
      </Tabs>
    </div>
  )
}

export default OperationsReports
