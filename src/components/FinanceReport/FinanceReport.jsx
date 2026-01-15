import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinanceDtailes from '../FinanceDetailes/FinanceDtailes';
import { useQuery } from '@tanstack/react-query';
import { getAllReports } from '@/api/reportts';
const FinanceReport = () => {
  const tabStyle = "bg-main-green text-main-gold text-base  h-12! data-[state=active]:bg-main-gold data-[state=active]:text-main-green"
  const tabs = [
    {
      lable:"Today",
      value:"today"
    },
    {
      lable:"Yesterday",
      value:"yesterday"
    },
    {
      lable:"This Week",
      value:"this_week"
    },
    {
      lable:"This Month",
      value:"this_month"
    },
    {
      lable:"This Year",
      value:"this_year"
    }
  ]
  const [filter, setFilter] = useState("today")
  
  const { data: reports } = useQuery({
    queryKey: ["all-reports", filter],
    queryFn: () => getAllReports(filter),
  })
  return (
    <div>
        <Tabs defaultValue={tabs[0]?.value} className="w-full   ">
        <TabsList className=" gap-2 p-2 rounded-lg bg-main-green/30">
          {tabs?.map((tab) => (
            <TabsTrigger onClick={() => setFilter(tab?.value)} className={tabStyle} value={tab?.value}>{tab?.lable}</TabsTrigger>
          ))}
        </TabsList>

        {/* Main Dashboard Content */}
        {
          tabs?.map((tab) => (
            <TabsContent key={tab?.value} value={tab?.value}>
              <FinanceDtailes reports={reports}/>
            </TabsContent>
          ))
        }
      </Tabs>
    </div>
  )
}

export default FinanceReport
