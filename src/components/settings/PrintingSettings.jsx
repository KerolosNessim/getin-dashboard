/* eslint-disable react-hooks/set-state-in-effect */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Loader2,
  Printer,
  RotateCcw,
  Save
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSettings } from '@/api/settings';
import { toast } from 'sonner';
const PrintingSettings = ({ settings }) => {
  // Printing Settings State
  const [printingSettings, setPrintingSettings] = useState({
    auto_print_orders: false,
    printer_name: "",
    receipt_format: "",
    print_kitchen_copy: false,
    print_customer_copy: false,
  });

  useEffect(() => {
    if (!settings) return;
    setPrintingSettings({
      auto_print_orders: Boolean(settings?.auto_print_orders),
      printer_name: settings?.printer_name ?? "",
      receipt_format: settings?.receipt_format ?? "",
      print_kitchen_copy: Boolean(settings?.print_kitchen_copy),
      print_customer_copy: Boolean(settings?.print_customer_copy),
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
              checked={printingSettings.auto_print_orders}
              onCheckedChange={(checked) => setPrintingSettings({ ...printingSettings, auto_print_orders: checked })}
            />
          </div>

          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">

            <div className="space-y-2">
              <Label htmlFor="printerName">Printer Name</Label>
              <Input
                value={printingSettings.printer_name}
                onChange={(e) => setPrintingSettings({ ...printingSettings, printer_name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="receiptFormat">Receipt Format</Label>
              <Input
                value={printingSettings.receipt_format}
                onChange={(e) => setPrintingSettings({ ...printingSettings, receipt_format: e.target.value })}
              />
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
              checked={printingSettings.print_kitchen_copy}
              onCheckedChange={(checked) => setPrintingSettings({ ...printingSettings, print_kitchen_copy: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="printCustomer">Print Customer Copy</Label>
              <p className="text-xs text-gray-500">Print receipt for customer</p>
            </div>
            <Switch
              id="printCustomer"
              checked={printingSettings.print_customer_copy}
              onCheckedChange={(checked) => setPrintingSettings({ ...printingSettings, print_customer_copy: checked })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {/* <Button variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button> */}
          <Button
            onClick={() => settingsMutation(printingSettings)}
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

export default PrintingSettings