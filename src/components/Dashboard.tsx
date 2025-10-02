import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Settings } from './Settings';
import { SendSMS } from './SendSMS';
import { Credits } from './Credits';
import { ApiManagement } from './ApiManagement';
import { EarnPoints } from './EarnPoints';
import { LayoutDashboard, Settings as SettingsIcon, LogOut, Send, Wallet, Code, Gift } from 'lucide-react';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl">Dashboard</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <p className="text-muted-foreground hidden sm:block">Welcome, {user?.name}</p>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="mb-6 sm:mb-8 overflow-x-auto -mx-4 px-4">
            <TabsList className="inline-flex w-auto min-w-full sm:min-w-0">
              <TabsTrigger value="dashboard" className="gap-2 flex-shrink-0">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="send-sms" className="gap-2 flex-shrink-0">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Send SMS</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="gap-2 flex-shrink-0">
                <Code className="h-4 w-4" />
                <span className="hidden sm:inline">API</span>
              </TabsTrigger>
              <TabsTrigger value="credits" className="gap-2 flex-shrink-0">
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">Credits</span>
              </TabsTrigger>
              <TabsTrigger value="earn" className="gap-2 flex-shrink-0">
                <Gift className="h-4 w-4" />
                <span className="hidden sm:inline">Earn</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2 flex-shrink-0">
                <SettingsIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>SMS Sent</CardTitle>
                  <CardDescription>Total messages this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl">1,234</p>
                  <p className="text-muted-foreground mt-2">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Rate</CardTitle>
                  <CardDescription>Successful deliveries</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl">98.5%</p>
                  <p className="text-muted-foreground mt-2">1,215 delivered</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Credits Remaining</CardTitle>
                  <CardDescription>Available SMS credits</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl">247</p>
                  <p className="text-muted-foreground mt-2">~20 days at current rate</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest SMS actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p>SMS sent to +639171234567</p>
                      <p className="text-muted-foreground">2 hours ago • 1 credit</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p>500 credits purchased</p>
                      <p className="text-muted-foreground">1 day ago • ₱2,250.00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p>Bulk campaign sent</p>
                      <p className="text-muted-foreground">3 days ago • 238 credits</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="send-sms">
            <SendSMS />
          </TabsContent>

          <TabsContent value="api">
            <ApiManagement />
          </TabsContent>

          <TabsContent value="credits">
            <Credits />
          </TabsContent>

          <TabsContent value="earn">
            <EarnPoints />
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
