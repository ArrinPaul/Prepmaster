"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Target, TrendingUp, Calendar } from "lucide-react";

const activityData = [
  { day: "Mon", problems: 3, time: 45 },
  { day: "Tue", problems: 5, time: 90 },
  { day: "Wed", problems: 2, time: 30 },
  { day: "Thu", problems: 4, time: 60 },
  { day: "Fri", problems: 6, time: 120 },
  { day: "Sat", problems: 8, time: 150 },
  { day: "Sun", problems: 4, time: 75 },
];

const milestones = [
  { title: "100 Problems Solved", date: "2024-01-15", icon: Trophy },
  { title: "30-Day Streak", date: "2024-01-10", icon: Flame },
  { title: "First Mock Interview", date: "2024-01-05", icon: Target },
];

export default function ActivityPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold">Activity & Streak</h1>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Streak Card */}
          <Card className="bg-gradient-to-r from-warning/20 to-warning/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl mb-2">15 Day Streak! 🔥</CardTitle>
                  <CardDescription>Keep going! You're on fire!</CardDescription>
                </div>
                <Flame className="h-16 w-16 text-warning" />
              </div>
            </CardHeader>
          </Card>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Flame className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15 days</div>
                <p className="text-xs text-muted-foreground">Best: 23 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32 problems</div>
                <p className="text-xs text-muted-foreground">+8 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9.5 hrs</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Milestones</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Achievements unlocked</p>
              </CardContent>
            </Card>
          </div>

          {/* Activity Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Problems solved this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2 h-48">
                {activityData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-primary/20 rounded-t relative" style={{ height: `${(data.problems / 8) * 100}%` }}>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold">
                        {data.problems}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{data.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Milestones */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Milestones</CardTitle>
              <CardDescription>Your recent achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <milestone.icon className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <p className="font-semibold">{milestone.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(milestone.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge>New</Badge>
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
