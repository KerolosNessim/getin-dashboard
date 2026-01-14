/* eslint-disable react-hooks/set-state-in-effect */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  RotateCcw,
  Save,
  ShoppingBag,
  Loader2
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSettings } from '@/api/settings';
import { toast } from 'sonner';

const OrdersSettings = ({ settings }) => {
  // Online Orders Settings State
  const [onlineOrdersSettings, setOnlineOrdersSettings] = useState({
    enable_online_orders: true,
    preparation_time: '15',
    auto_accept_orders: false,
    delivery_integration: null,
  });

  useEffect(() => {
    if (!settings) return;
    setOnlineOrdersSettings({
      enable_online_orders: Boolean(settings?.enable_online_orders),
      preparation_time: settings?.preparation_time ?? '15',
      auto_accept_orders: Boolean(settings?.auto_accept_orders),
      delivery_integration: settings?.delivery_integration ?? null,
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
              checked={onlineOrdersSettings.enable_online_orders}
              onCheckedChange={(checked) => setOnlineOrdersSettings({ ...onlineOrdersSettings, enable_online_orders: checked })}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="prepTime">Preparation Time (minutes)</Label>
            <Input
              id="prepTime"
              type="number"
              value={onlineOrdersSettings.preparation_time}
              onChange={(e) => setOnlineOrdersSettings({ ...onlineOrdersSettings, preparation_time: e.target.value })}
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
              checked={onlineOrdersSettings.auto_accept_orders}
              onCheckedChange={(checked) => setOnlineOrdersSettings({ ...onlineOrdersSettings, auto_accept_orders: checked })}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="deliveryInt">Delivery Integration</Label>
            <Input
              id="deliveryInt"
              type="text"
              value={onlineOrdersSettings.delivery_integration || ''}
              onChange={(e) => setOnlineOrdersSettings({ ...onlineOrdersSettings, delivery_integration: e.target.value })}
              className="border-main-green/30"
            />
            <p className="text-xs text-gray-500">Select delivery integration platform</p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {/* <Button variant="outline" >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button> */}
          <Button
            onClick={() => settingsMutation(onlineOrdersSettings)}
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

export default OrdersSettings