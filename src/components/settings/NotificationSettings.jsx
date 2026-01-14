/* eslint-disable react-hooks/set-state-in-effect */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Bell,
  Loader2,
  RotateCcw,
  Save
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSettings } from '@/api/settings';
import { toast } from 'sonner';

const NotificationSettings = ({ settings }) => {
  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    order_sound_alert: false,
    mobile_notifications: false,
    email_notifications: false,
    low_stock_alerts: false,
  });

  useEffect(() => {
    if (!settings) return;
    setNotificationSettings({
      order_sound_alert: Boolean(settings?.order_sound_alert),
      mobile_notifications: Boolean(settings?.mobile_notifications),
      email_notifications: Boolean(settings?.email_notifications),
      low_stock_alerts: Boolean(settings?.low_stock_alerts),
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
              checked={notificationSettings.order_sound_alert}
              onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, order_sound_alert: checked })}
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
              checked={notificationSettings.mobile_notifications}
              onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, mobile_notifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotif">Email Notifications</Label>
              <p className="text-xs text-gray-500">Send alerts via email</p>
            </div>
            <Switch
              id="emailNotif"
              checked={notificationSettings.email_notifications}
              onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, email_notifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="lowStock">Low Stock Alerts</Label>
              <p className="text-xs text-gray-500">Notify when inventory is low</p>
            </div>
            <Switch
              id="lowStock"
              checked={notificationSettings.low_stock_alerts}
              onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, low_stock_alerts: checked })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {/* <Button variant="outline" >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button> */}
          <Button
            onClick={() => settingsMutation(notificationSettings)}
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

export default NotificationSettings