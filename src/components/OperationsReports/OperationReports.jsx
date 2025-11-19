import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinanceDtailes from '../FinanceDetailes/FinanceDtailes';
import OperationsDetailes from '../OperationsDetailes/OperationsDetailes';
const OperationsReports = () => {
  const tabStyle = "bg-main-green text-main-gold text-base  h-12! data-[state=active]:bg-main-gold data-[state=active]:text-main-green"
  const tabs = ["daily", "weekly", "monthly"]
  return (
    <div>
      <Tabs defaultValue={tabs[0]} className="w-full   ">
        <TabsList className=" gap-2 p-2 rounded-lg bg-main-green/30">
          {tabs.map((tab) => (
            <TabsTrigger className={tabStyle} value={tab}>{tab?.charAt(0).toUpperCase() + tab?.slice(1)}</TabsTrigger>
          ))}
        </TabsList>

        {/* Main Dashboard Content */}
        {
          tabs.map((tab) => (
            <TabsContent key={tab} value={tab}>
              <OperationsDetailes />
            </TabsContent>
          ))
        }
      </Tabs>
    </div>
  )
}

export default OperationsReports
