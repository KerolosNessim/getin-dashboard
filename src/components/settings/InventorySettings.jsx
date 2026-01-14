/* eslint-disable react-hooks/set-state-in-effect */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Package,
  Loader2,
  RotateCcw,
  Save
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSettings } from '@/api/settings';
import { toast } from 'sonner';

const InventorySettings = ({ settings }) => {
  // Inventory Settings State
  const [inventorySettings, setInventorySettings] = useState({
    auto_deduction: true,
    minimum_stock_alert_level: '10',
    auto_ordering: false,
  });

  useEffect(() => {
    if (!settings) return;
    setInventorySettings({
      auto_deduction: Boolean(settings?.auto_deduction),
      minimum_stock_alert_level: settings?.minimum_stock_alert_level ?? '10',
      auto_ordering: Boolean(settings?.auto_ordering),
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
              checked={inventorySettings.auto_deduction}
              onCheckedChange={(checked) => setInventorySettings({ ...inventorySettings, auto_deduction: checked })}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="minStock">Minimum Stock Alert Level</Label>
            <Input
              id="minStock"
              type="number"
              value={inventorySettings.minimum_stock_alert_level}
              onChange={(e) => setInventorySettings({ ...inventorySettings, minimum_stock_alert_level: e.target.value })}
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
              checked={inventorySettings.auto_ordering}
              onCheckedChange={(checked) => setInventorySettings({ ...inventorySettings, auto_ordering: checked })}
            />
          </div>


        </div>

        <div className="flex justify-end gap-3">
          {/* <Button variant="outline" >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button> */}
          <Button
            onClick={() => settingsMutation(inventorySettings)}
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

export default InventorySettings