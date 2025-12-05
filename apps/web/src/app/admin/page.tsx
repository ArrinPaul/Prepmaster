"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, AlertTriangle, DollarSign, Activity, TrendingUp, UserPlus, Flag } from "lucide-react";

const stats = [
  { label: "Total Users", value: "12,345", change: "+12%", icon: Users },
  { label: "Active Today", value: "1,234", change: "+5%", icon: Activity },
  { label: "New Signups", value: "89", change: "+23%", icon: UserPlus },
  { label: "Revenue (MRR)", value: "$45,678", change: "+8%", icon: DollarSign },
  { label: "Content Items", value: "2,567", change: "+15", icon: FileText },
  { label: "Pending Reports", value: "12", change: "-3", icon: Flag },
  { label: "System Health", value: "99.9%", change: "0%", icon: TrendingUp },
  { label: "Open Tickets", value: "23", change: "+5", icon: AlertTriangle },
];

export default function AdminPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">System Overview</h2>
            <p className="text-muted-foreground">
              Monitor platform health and key metrics
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 pb-3 border-b last:border-0">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">User action {i}</p>
                      <p className="text-xs text-muted-foreground">{i} minutes ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
