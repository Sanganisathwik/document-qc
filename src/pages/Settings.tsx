import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Settings = () => {
  const handleSave = () => {
    toast.success('Settings saved');
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-2xl animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your workspace preferences
          </p>
        </div>

        <Card className="bg-surface">
          <CardHeader>
            <CardTitle className="text-base">Notifications</CardTitle>
            <CardDescription>Configure how you receive updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email notifications</Label>
                <p className="text-sm text-muted-foreground">Receive daily digest emails</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Critical alerts</Label>
                <p className="text-sm text-muted-foreground">Immediate alerts for critical errors</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Sound notifications</Label>
                <p className="text-sm text-muted-foreground">Play sound for new documents</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface">
          <CardHeader>
            <CardTitle className="text-base">Processing</CardTitle>
            <CardDescription>Default processing options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-retry failed documents</Label>
                <p className="text-sm text-muted-foreground">Automatically retry after 5 minutes</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Apply suggestions automatically</Label>
                <p className="text-sm text-muted-foreground">Auto-apply high-confidence fixes</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Confidence threshold</Label>
              <p className="text-sm text-muted-foreground">Minimum confidence for auto-approval</p>
              <Input type="number" defaultValue="95" className="w-24" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface">
          <CardHeader>
            <CardTitle className="text-base">Keyboard Shortcuts</CardTitle>
            <CardDescription>Quick actions reference</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { key: 'j / k', action: 'Navigate list' },
                { key: 'Enter', action: 'Open document' },
                { key: 'Escape', action: 'Close / Go back' },
                { key: '/', action: 'Focus search' },
                { key: 'r', action: 'Retry document' },
                { key: 'm', action: 'Mark resolved' },
                { key: 'Space', action: 'Select item' },
                { key: '?', action: 'Show help' },
              ].map((shortcut) => (
                <div key={shortcut.key} className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground">{shortcut.action}</span>
                  <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
