"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Code2, Video, Trophy, TrendingUp, Clock, Target, Zap } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Total Problems Solved", value: "127", icon: Code2, change: "+12 this week" },
  { label: "Mock Interviews", value: "8", icon: Video, change: "+2 this week" },
  { label: "Current Streak", value: "15 days", icon: Trophy, change: "Keep it up!" },
  { label: "Study Hours", value: "42h", icon: Clock, change: "+8h this week" },
];

const recentActivity = [
  { title: "Completed Two Sum", type: "problem", time: "2 hours ago", difficulty: "Easy" },
  { title: "Mock Interview: System Design", type: "interview", time: "1 day ago", score: "85%" },
  { title: "Completed Array Problems", type: "course", time: "2 days ago", progress: "100%" },
  { title: "Solved Binary Tree Level Order", type: "problem", time: "3 days ago", difficulty: "Medium" },
];

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Welcome Banner */}
          <Card className="bg-gradient-to-r from-muted/50 to-muted/30 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome back, John!</CardTitle>
              <CardDescription>
                You've solved 12 problems this week. Keep up the great work!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Link href="/interviews/create">
                  <Button>
                    <Video className="h-4 w-4 mr-2" />
                    Start Interview
                  </Button>
                </Link>
                <Link href="/coding/problems">
                  <Button variant="outline">
                    <Code2 className="h-4 w-4 mr-2" />
                    Practice Coding
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

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
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Current Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Current Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Solve 150 Problems</span>
                    <span className="text-sm text-muted-foreground">127/150</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Complete System Design Course</span>
                    <span className="text-sm text-muted-foreground">60%</span>
                  </div>
                  <Progress value={60} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">30-Day Streak</span>
                    <span className="text-sm text-muted-foreground">15/30</span>
                  </div>
                  <Progress value={50} />
                </div>
                <Link href="/goals">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Goals
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      {activity.difficulty && (
                        <Badge variant={activity.difficulty === "Easy" ? "secondary" : "default"}>
                          {activity.difficulty}
                        </Badge>
                      )}
                      {activity.score && (
                        <Badge variant="secondary">{activity.score}</Badge>
                      )}
                    </div>
                  ))}
                </div>
                <Link href="/activity">
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View All Activity
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Start
              </CardTitle>
              <CardDescription>Jump right into your preparation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Link href="/coding/daily">
                  <Card className="hover:bg-accent cursor-pointer transition-colors">
                    <CardHeader>
                      <Calendar className="h-8 w-8 mb-2" />
                      <CardTitle className="text-base">Daily Challenge</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Solve today's problem</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/roadmaps">
                  <Card className="hover:bg-accent cursor-pointer transition-colors">
                    <CardHeader>
                      <Target className="h-8 w-8 mb-2" />
                      <CardTitle className="text-base">Learning Paths</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Continue your roadmap</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/leaderboard">
                  <Card className="hover:bg-accent cursor-pointer transition-colors">
                    <CardHeader>
                      <TrendingUp className="h-8 w-8 mb-2" />
                      <CardTitle className="text-base">Leaderboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">See your ranking</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
