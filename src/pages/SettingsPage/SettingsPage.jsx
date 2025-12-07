import SectionHeader from '@/components/SctionHeader/SectionHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  Building2,
  Clock,
  CreditCard,
  Lock,
  Package,
  Printer,
  RotateCcw,
  Save,
  Shield,
  ShoppingBag,
  Users
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const tabStyle = "bg-main-gold text-main-green text-base h-12 data-[state=active]:bg-main-green data-[state=active]:text-main-gold transition-all duration-200"
  const [activeTab, setActiveTab] = useState('business');

  // Business Settings State
  const [businessSettings, setBusinessSettings] = useState({
    branchName: 'Tahrir Branch',
    phoneNumber: '+20 123 456 7890',
    openingTime: '08:00',
    closingTime: '22:00',
    peakHoursStart: '12:00',
    peakHoursEnd: '14:00',
    orderPrefix: 'T-I',
    orderStartNumber: '0011',
    maxOrdersPerHour: '50',
    enablePeakPricing: false,
  });

  // Printing Settings State
  const [printingSettings, setPrintingSettings] = useState({
    autoPrint: true,
    printerName: 'Kitchen Printer 1',
    receiptFormat: 'standard',
    printKitchenCopy: true,
    printCustomerCopy: true,
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    orderSound: true,
    soundVolume: '80',
    mobileNotifications: true,
    emailNotifications: false,
    lowStockAlerts: true,
  });

  // Inventory Settings State
  const [inventorySettings, setInventorySettings] = useState({
    autoDeduction: true,
    minStockAlert: '10',
    autoOrdering: false,
    autoOrderThreshold: '20',
  });

  // // Payment Settings State
  // const [paymentSettings, setPaymentSettings] = useState({
  //   acceptCash: true,
  //   acceptCard: true,
  //   acceptMobile: true,
  //   taxRate: '14',
  //   serviceFee: '0',
  // });

  // Online Orders Settings State
  const [onlineOrdersSettings, setOnlineOrdersSettings] = useState({
    enableOnlineOrders: true,
    preparationTime: '15',
    autoAccept: false,
    deliveryIntegration: 'none',
  });

  // // Security Settings State
  // const [securitySettings, setSecuritySettings] = useState({
  //   requirePassword: true,
  //   enable2FA: false,
  //   sessionTimeout: '30',
  //   logUserActions: true,
  // });

  const handleSaveSettings = (section) => {
    toast.success(`${section} settings saved successfully!`);
  };

  const handleResetSettings = (section) => {
    toast.info(`${section} settings reset to defaults`);
  };

  const tabs = [
    { id: 'business', label: 'Business' },
    { id: 'printing', label: 'Printing' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'inventory', label: 'Inventory' },
    // { id: 'payments', label: 'Payments' },
    { id: 'online', label: 'Online Orders' },
    // { id: 'security', label: 'Security' },
  ];

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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-main-green">
                <Building2 className="w-5 h-5" />
                Business Settings
              </CardTitle>
              <CardDescription>Configure your business hours, order settings, and operational limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Branch Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Branch Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="branchName">Branch Name</Label>
                    <Input
                      id="branchName"
                      placeholder="e.g., Tahrir Branch"
                      value={businessSettings.branchName}
                      onChange={(e) => setBusinessSettings({ ...businessSettings, branchName: e.target.value })}
                      className="border-main-green/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="+20 123 456 7890"
                      value={businessSettings.phoneNumber}
                      onChange={(e) => setBusinessSettings({ ...businessSettings, phoneNumber: e.target.value })}
                      className="border-main-green/30"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Working Hours */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Working Hours
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openingTime">Opening Time</Label>
                    <Input
                      id="openingTime"
                      type="time"
                      value={businessSettings.openingTime}
                      onChange={(e) => setBusinessSettings({ ...businessSettings, openingTime: e.target.value })}
                      className="border-main-green/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closingTime">Closing Time</Label>
                    <Input
                      id="closingTime"
                      type="time"
                      value={businessSettings.closingTime}
                      onChange={(e) => setBusinessSettings({ ...businessSettings, closingTime: e.target.value })}
                      className="border-main-green/30"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Peak Hours */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Peak Hours</h3>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="peakPricing" className="text-sm">Enable Peak Pricing</Label>
                    <Switch
                      id="peakPricing"
                      checked={businessSettings.enablePeakPricing}
                      onCheckedChange={(checked) => setBusinessSettings({ ...businessSettings, enablePeakPricing: checked })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="peakStart">Peak Start Time</Label>
                    <Input
                      id="peakStart"
                      type="time"
                      value={businessSettings.peakHoursStart}
                      onChange={(e) => setBusinessSettings({ ...businessSettings, peakHoursStart: e.target.value })}
                      className="border-main-green/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="peakEnd">Peak End Time</Label>
                    <Input
                      id="peakEnd"
                      type="time"
                      value={businessSettings.peakHoursEnd}
                      onChange={(e) => setBusinessSettings({ ...businessSettings, peakHoursEnd: e.target.value })}
                      className="border-main-green/30"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Order Settings */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">Order Number Format</h3>
                <p className="text-xs text-gray-500">Configure how order numbers are generated (e.g., T-I0011, T-I0012...)</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="orderPrefix">Order Prefix</Label>
                    <Input
                      id="orderPrefix"
                      placeholder="T-I"
                      value={businessSettings.orderPrefix}
                      onChange={(e) => setBusinessSettings({ ...businessSettings, orderPrefix: e.target.value })}
                      className="border-main-green/30"
                    />
                    <p className="text-xs text-gray-500">Branch identifier (e.g., T-I for Tahrir Branch)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderStart">Starting Number</Label>
                    <Input
                      id="orderStart"
                      placeholder="0011"
                      value={businessSettings.orderStartNumber}
                      onChange={(e) => setBusinessSettings({ ...businessSettings, orderStartNumber: e.target.value })}
                      className="border-main-green/30"
                    />
                    <p className="text-xs text-gray-500">First order number</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxOrders">Max Orders/Hour</Label>
                    <Input
                      id="maxOrders"
                      type="number"
                      value={businessSettings.maxOrdersPerHour}
                      onChange={(e) => setBusinessSettings({ ...businessSettings, maxOrdersPerHour: e.target.value })}
                      className="border-main-green/30"
                    />
                    <p className="text-xs text-gray-500">Capacity limit</p>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Preview:</strong> Next order will be: <span className="font-mono font-bold">{businessSettings.orderPrefix}{businessSettings.orderStartNumber}</span>
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => handleResetSettings('Business')}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={() => handleSaveSettings('Business')} className="bg-main-green hover:bg-main-green/90 text-main-gold">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Printing Settings */}
        <TabsContent value="printing" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-main-green">
                <Printer className="w-5 h-5" />
                Printing Settings
              </CardTitle>
              <CardDescription>Configure printer connections and receipt formats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoPrint">Auto Print Orders</Label>
                    <p className="text-xs text-gray-500">Automatically print when order is received</p>
                  </div>
                  <Switch
                    id="autoPrint"
                    checked={printingSettings.autoPrint}
                    onCheckedChange={(checked) => setPrintingSettings({ ...printingSettings, autoPrint: checked })}
                  />
                </div>

                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">

                  <div className="space-y-2">
                    <Label htmlFor="printerName">Printer Name</Label>
                    <Select
                      value={printingSettings.printerName}
                      onValueChange={(value) => setPrintingSettings({ ...printingSettings, printerName: value })}
                    >
                      <SelectTrigger className="border-main-green/30 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kitchen Printer 1">Kitchen Printer 1</SelectItem>
                        <SelectItem value="Kitchen Printer 2">Kitchen Printer 2</SelectItem>
                        <SelectItem value="Counter Printer">Counter Printer</SelectItem>
                        <SelectItem value="Receipt Printer">Receipt Printer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="receiptFormat">Receipt Format</Label>
                    <Select
                      value={printingSettings.receiptFormat}
                      onValueChange={(value) => setPrintingSettings({ ...printingSettings, receiptFormat: value })}
                    >
                      <SelectTrigger className="border-main-green/30 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (80mm)</SelectItem>
                        <SelectItem value="compact">Compact (58mm)</SelectItem>
                        <SelectItem value="detailed">Detailed with Logo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="printKitchen">Print Kitchen Copy</Label>
                    <p className="text-xs text-gray-500">Send copy to kitchen printer</p>
                  </div>
                  <Switch
                    id="printKitchen"
                    checked={printingSettings.printKitchenCopy}
                    onCheckedChange={(checked) => setPrintingSettings({ ...printingSettings, printKitchenCopy: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="printCustomer">Print Customer Copy</Label>
                    <p className="text-xs text-gray-500">Print receipt for customer</p>
                  </div>
                  <Switch
                    id="printCustomer"
                    checked={printingSettings.printCustomerCopy}
                    onCheckedChange={(checked) => setPrintingSettings({ ...printingSettings, printCustomerCopy: checked })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => handleResetSettings('Printing')}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={() => handleSaveSettings('Printing')} className="bg-main-green hover:bg-main-green/90 text-main-gold">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-main-green">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Manage alerts and notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="orderSound">Order Sound Alert</Label>
                    <p className="text-xs text-gray-500">Play sound when new order arrives</p>
                  </div>
                  <Switch
                    id="orderSound"
                    checked={notificationSettings.orderSound}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, orderSound: checked })}
                  />
                </div>



                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mobileNotif">Mobile Notifications</Label>
                    <p className="text-xs text-gray-500">Push notifications to mobile app</p>
                  </div>
                  <Switch
                    id="mobileNotif"
                    checked={notificationSettings.mobileNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, mobileNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotif">Email Notifications</Label>
                    <p className="text-xs text-gray-500">Send alerts via email</p>
                  </div>
                  <Switch
                    id="emailNotif"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="lowStock">Low Stock Alerts</Label>
                    <p className="text-xs text-gray-500">Notify when inventory is low</p>
                  </div>
                  <Switch
                    id="lowStock"
                    checked={notificationSettings.lowStockAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, lowStockAlerts: checked })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => handleResetSettings('Notification')}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={() => handleSaveSettings('Notification')} className="bg-main-green hover:bg-main-green/90 text-main-gold">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Settings */}
        <TabsContent value="inventory" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-main-green">
                <Package className="w-5 h-5" />
                Inventory Settings
              </CardTitle>
              <CardDescription>Configure automatic inventory management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoDeduct">Auto Deduction</Label>
                    <p className="text-xs text-gray-500">Automatically deduct ingredients when order is completed</p>
                  </div>
                  <Switch
                    id="autoDeduct"
                    checked={inventorySettings.autoDeduction}
                    onCheckedChange={(checked) => setInventorySettings({ ...inventorySettings, autoDeduction: checked })}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="minStock">Minimum Stock Alert Level</Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={inventorySettings.minStockAlert}
                    onChange={(e) => setInventorySettings({ ...inventorySettings, minStockAlert: e.target.value })}
                    className="border-main-green/30"
                  />
                  <p className="text-xs text-gray-500">Alert when stock falls below this level</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoOrder">Auto Ordering</Label>
                    <p className="text-xs text-gray-500">Automatically create orders when stock is low</p>
                  </div>
                  <Switch
                    id="autoOrder"
                    checked={inventorySettings.autoOrdering}
                    onCheckedChange={(checked) => setInventorySettings({ ...inventorySettings, autoOrdering: checked })}
                  />
                </div>

                {inventorySettings.autoOrdering && (
                  <div className="space-y-2 ml-6">
                    <Label htmlFor="autoThreshold">Auto Order Threshold</Label>
                    <Input
                      id="autoThreshold"
                      type="number"
                      value={inventorySettings.autoOrderThreshold}
                      onChange={(e) => setInventorySettings({ ...inventorySettings, autoOrderThreshold: e.target.value })}
                      className="border-main-green/30"
                    />
                    <p className="text-xs text-gray-500">Create order when stock reaches this level</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => handleResetSettings('Inventory')}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={() => handleSaveSettings('Inventory')} className="bg-main-green hover:bg-main-green/90 text-main-gold">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>



        {/* Payment Settings */}
        {/* <TabsContent value="payments" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-main-green">
                <CreditCard className="w-5 h-5" />
                Payment Settings
              </CardTitle>
              <CardDescription>Configure payment methods and fees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">Accepted Payment Methods</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="acceptCash">Cash</Label>
                    <p className="text-xs text-gray-500">Accept cash payments</p>
                  </div>
                  <Switch
                    id="acceptCash"
                    checked={paymentSettings.acceptCash}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, acceptCash: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="acceptCard">Credit/Debit Card</Label>
                    <p className="text-xs text-gray-500">Accept card payments</p>
                  </div>
                  <Switch
                    id="acceptCard"
                    checked={paymentSettings.acceptCard}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, acceptCard: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="acceptMobile">Mobile Wallet</Label>
                    <p className="text-xs text-gray-500">Accept mobile payments (Vodafone Cash, etc.)</p>
                  </div>
                  <Switch
                    id="acceptMobile"
                    checked={paymentSettings.acceptMobile}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, acceptMobile: checked })}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={paymentSettings.taxRate}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, taxRate: e.target.value })}
                      className="border-main-green/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceFee">Service Fee (%)</Label>
                    <Input
                      id="serviceFee"
                      type="number"
                      value={paymentSettings.serviceFee}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, serviceFee: e.target.value })}
                      className="border-main-green/30"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => handleResetSettings('Payment')}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={() => handleSaveSettings('Payment')} className="bg-main-green hover:bg-main-green/90 text-main-gold">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}

        {/* Online Orders Settings */}
        <TabsContent value="online" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-main-green">
                <ShoppingBag className="w-5 h-5" />
                Online Orders Settings
              </CardTitle>
              <CardDescription>Configure delivery integrations and online order preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableOnline">Enable Online Orders</Label>
                    <p className="text-xs text-gray-500">Accept orders from delivery platforms</p>
                  </div>
                  <Switch
                    id="enableOnline"
                    checked={onlineOrdersSettings.enableOnlineOrders}
                    onCheckedChange={(checked) => setOnlineOrdersSettings({ ...onlineOrdersSettings, enableOnlineOrders: checked })}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="prepTime">Preparation Time (minutes)</Label>
                  <Input
                    id="prepTime"
                    type="number"
                    value={onlineOrdersSettings.preparationTime}
                    onChange={(e) => setOnlineOrdersSettings({ ...onlineOrdersSettings, preparationTime: e.target.value })}
                    className="border-main-green/30"
                  />
                  <p className="text-xs text-gray-500">Estimated time to prepare orders</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoAccept">Auto Accept Orders</Label>
                    <p className="text-xs text-gray-500">Automatically accept incoming orders</p>
                  </div>
                  <Switch
                    id="autoAccept"
                    checked={onlineOrdersSettings.autoAccept}
                    onCheckedChange={(checked) => setOnlineOrdersSettings({ ...onlineOrdersSettings, autoAccept: checked })}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="deliveryInt">Delivery Integration</Label>
                  <Select
                    value={onlineOrdersSettings.deliveryIntegration}
                    onValueChange={(value) => setOnlineOrdersSettings({ ...onlineOrdersSettings, deliveryIntegration: value })}
                  >
                    <SelectTrigger className="border-main-green/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="talabat">Talabat</SelectItem>
                      <SelectItem value="elmenus">Elmenus</SelectItem>
                      <SelectItem value="uber">Uber Eats</SelectItem>
                      <SelectItem value="all">All Platforms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => handleResetSettings('Online Orders')}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={() => handleSaveSettings('Online Orders')} className="bg-main-green hover:bg-main-green/90 text-main-gold">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        {/* <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-main-green">
                <Lock className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security and authentication settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requirePass">Require Password</Label>
                    <p className="text-xs text-gray-500">Require password for system access</p>
                  </div>
                  <Switch
                    id="requirePass"
                    checked={securitySettings.requirePassword}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, requirePassword: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable2fa">Two-Factor Authentication (2FA)</Label>
                    <p className="text-xs text-gray-500">Add extra security layer with 2FA</p>
                  </div>
                  <Switch
                    id="enable2fa"
                    checked={securitySettings.enable2FA}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enable2FA: checked })}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                    className="border-main-green/30"
                  />
                  <p className="text-xs text-gray-500">Auto logout after inactivity</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="logActions">Log User Actions</Label>
                    <p className="text-xs text-gray-500">Track all user activities</p>
                  </div>
                  <Switch
                    id="logActions"
                    checked={securitySettings.logUserActions}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, logUserActions: checked })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => handleResetSettings('Security')}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={() => handleSaveSettings('Security')} className="bg-main-green hover:bg-main-green/90 text-main-gold">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}

      </Tabs>
    </div>
  );
}
