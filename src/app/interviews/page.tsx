"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Plus, Clock, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

const recentInterviews = [
  {
    id: "1",
    title: "Frontend Developer Interview",
    type: "Technical",
    date: "2024-01-15",
    score: 85,
    duration: "45 min",
    status: "completed",
  },
  {
    id: "2",
    title: "System Design Discussion",
    type: "System Design",
    date: "2024-01-12",
    score: 78,
    duration: "60 min",
    status: "completed",
  },
  {
    id: "3",
    title: "Behavioral Interview",
    type: "Behavioral",
    date: "2024-01-10",
    score: 92,
    duration: "30 min",
    status: "completed",
  },
];

const interviewTypes = [
  {
    title: "Technical Interview",
    description: "Practice coding problems and algorithms",
    icon: "💻",
    duration: "45-60 min",
  },
  {
    title: "System Design",
    description: "Design scalable systems and architectures",
    icon: "🏗️",
    duration: "60-90 min",
  },
  {
    title: "Behavioral Interview",
    description: "Practice answering behavioral questions",
    icon: "💬",
    duration: "30-45 min",
  },
];

export default function InterviewsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center justify-between flex-1">
            <h1 className="text-xl font-semibold">Mock Interviews</h1>
            <Link href="/interviews/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Interview
              </Button>
            </Link>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+2 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Practice Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6.5 hrs</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Interview Types */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Start a New Interview</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {interviewTypes.map((type, index) => (
                <Link key={index} href="/interviews/create">
                  <Card className="hover:bg-accent cursor-pointer transition-colors h-full">
                    <CardHeader>
                      <div className="text-4xl mb-2">{type.icon}</div>
                      <CardTitle>{type.title}</CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {type.duration}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Interviews */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Recent Interviews</h2>
              <Link href="/interviews/history">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentInterviews.map((interview) => (
                <Card key={interview.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{interview.title}</CardTitle>
                        <CardDescription>
                          {new Date(interview.date).toLocaleDateString()} • {interview.duration}
                        </CardDescription>
                      </div>
                      <Badge>{interview.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-warning fill-warning" />
                          <span className="font-semibold">{interview.score}%</span>
                        </div>
                        <Badge variant="secondary">{interview.status}</Badge>
                      </div>
                      <Link href={`/interviews/${interview.id}/report`}>
                        <Button variant="outline" size="sm">View Report</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
