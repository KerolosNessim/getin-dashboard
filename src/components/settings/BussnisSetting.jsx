/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Clock, Loader2, RotateCcw, Save } from 'lucide-react';
import { Separator } from '@radix-ui/react-select';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { updateSettings } from '@/api/settings';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const BussnisSetting = ({ settings }) => {
  // Business Settings State
  const [businessSettings, setBusinessSettings] = useState({
    name: "",
    phone_number: "",
    opening_time: "",
    closing_time: "",
    peak_start_time: "",
    peak_end_time: "",
    order_prefix: "",
    starting_number: "",
    max_orders_per_hour: "",
    enable_peak_pricing: false,
  });

  useEffect(() => {
    if (!settings) return;
    setBusinessSettings({
      name: settings?.name ?? "",
      phone_number: settings?.phone_number ?? "",
      opening_time: settings?.opening_time ?? "",
      closing_time: settings?.closing_time ?? "",
      peak_start_time: settings?.peak_start_time ?? "",
      peak_end_time: settings?.peak_end_time ?? "",
      order_prefix: settings?.order_prefix ?? "",
      starting_number: settings?.starting_number ?? "",
      max_orders_per_hour: settings?.max_orders_per_hour ?? "",
      enable_peak_pricing: Boolean(settings?.enable_peak_pricing),
    });
  }, [settings]);

  const queryClient = useQueryClient();
  const { mutate: settingsMutation, isPending } = useMutation({
    mutationFn: updateSettings,
    onSuccess: (res) => {
      toast.success(res?.message || "Settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: () => {
      toast.error("Failed to update settings");
    },
  });
  return (
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
                value={businessSettings.name}
                onChange={(e) => setBusinessSettings({ ...businessSettings, name: e.target.value })}
                className="border-main-green/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+20 123 456 7890"
                value={businessSettings.phone_number}
                onChange={(e) => setBusinessSettings({ ...businessSettings, phone_number: e.target.value })}
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
                value={businessSettings.opening_time}
                onChange={(e) => setBusinessSettings({ ...businessSettings, opening_time: e.target.value })}
                className="border-main-green/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="closingTime">Closing Time</Label>
              <Input
                id="closingTime"
                type="time"
                value={businessSettings.closing_time}
                onChange={(e) => setBusinessSettings({ ...businessSettings, closing_time: e.target.value })}
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
                checked={businessSettings.enable_peak_pricing}
                onCheckedChange={(checked) => setBusinessSettings({ ...businessSettings, enable_peak_pricing: checked })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="peakStart">Peak Start Time</Label>
              <Input
                id="peakStart"
                type="time"
                value={businessSettings.peak_start_time}
                onChange={(e) => setBusinessSettings({ ...businessSettings, peak_start_time: e.target.value })}
                className="border-main-green/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="peakEnd">Peak End Time</Label>
              <Input
                id="peakEnd"
                type="time"
                value={businessSettings.peak_end_time}
                onChange={(e) => setBusinessSettings({ ...businessSettings, peak_end_time: e.target.value })}
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
                value={businessSettings.order_prefix}
                onChange={(e) => setBusinessSettings({ ...businessSettings, order_prefix: e.target.value })}
                className="border-main-green/30"
              />
              <p className="text-xs text-gray-500">Branch identifier (e.g., T-I for Tahrir Branch)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="orderStart">Starting Number</Label>
              <Input
                id="orderStart"
                placeholder="0011"
                value={businessSettings.starting_number}
                onChange={(e) => setBusinessSettings({ ...businessSettings, starting_number: e.target.value })}
                className="border-main-green/30"
              />
              <p className="text-xs text-gray-500">First order number</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxOrders">Max Orders/Hour</Label>
              <Input
                id="maxOrders"
                type="number"
                value={businessSettings.max_orders_per_hour}
                onChange={(e) => setBusinessSettings({ ...businessSettings, max_orders_per_hour: e.target.value })}
                className="border-main-green/30"
              />
              <p className="text-xs text-gray-500">Capacity limit</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Preview:</strong><span> {settings?.order_preview}</span>
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex justify-end gap-3">
          {/* <Button variant="outline" o >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button> */}
          <Button
            onClick={() => settingsMutation(businessSettings)}
            disabled={isPending}
            className="bg-main-green hover:bg-main-green/90 text-main-gold">
            {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> :
              <Save className="w-4 h-4 mr-2" />
            }
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BussnisSetting