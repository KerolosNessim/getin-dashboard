import { getSettings } from '@/api/settings';
import SectionHeader from '@/components/SctionHeader/SectionHeader';
import BussnisSetting from '@/components/settings/BussnisSetting';
import InventorySettings from '@/components/settings/InventorySettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import OrdersSettings from '@/components/settings/OrdersSettings';
import PrintingSettings from '@/components/settings/PrintingSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function SettingsPage() {
  const tabStyle = "bg-main-gold text-main-green text-base h-12 data-[state=active]:bg-main-green data-[state=active]:text-main-gold transition-all duration-200"
  const [activeTab, setActiveTab] = useState('business');
  const tabs = [
    { id: 'business', label: 'Business' },
    { id: 'printing', label: 'Printing' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'online', label: 'Online Orders' },
  ];
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings
  })


  return (
    <div className="space-y-6 pb-10">
      <SectionHeader title="Settings" />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-transparent gap-2">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={`flex flex-col items-center py-2  ${tabStyle}`}
            >
              <span className=" font-medium">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {/* Business Settings */}
        <TabsContent value="business" className="space-y-6 mt-6">
          <BussnisSetting settings={settings} />
        </TabsContent>
        {/* Printing Settings */}
        <TabsContent value="printing" className="space-y-6 mt-6">
          <PrintingSettings settings={settings} />
        </TabsContent>
        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <NotificationSettings settings={settings} />
        </TabsContent>
        {/* Inventory Settings */}
        <TabsContent value="inventory" className="space-y-6 mt-6">
          <InventorySettings settings={settings} />
        </TabsContent>
        {/* Online Orders Settings */}
        <TabsContent value="online" className="space-y-6 mt-6">
          <OrdersSettings settings={settings} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
