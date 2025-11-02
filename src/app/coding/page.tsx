"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2, Trophy, Target, TrendingUp, Calendar, BookOpen } from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Arrays", solved: 45, total: 60, icon: "📊" },
  { name: "Strings", solved: 32, total: 45, icon: "📝" },
  { name: "Trees", solved: 28, total: 50, icon: "🌳" },
  { name: "Graphs", solved: 15, total: 40, icon: "🕸️" },
  { name: "Dynamic Programming", solved: 12, total: 55, icon: "🧮" },
  { name: "Sorting", solved: 20, total: 25, icon: "🔢" },
];

export default function CodingPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center justify-between flex-1">
            <h1 className="text-xl font-semibold">Coding Practice</h1>
            <Link href="/coding/problems">
              <Button>Browse Problems</Button>
            </Link>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
                <Code2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">Out of 275 total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Streak</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15 days</div>
                <p className="text-xs text-muted-foreground">Personal best: 23</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+3% this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ranking</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#1,234</div>
                <p className="text-xs text-muted-foreground">Top 15%</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/coding/daily">
              <Card className="hover:bg-accent cursor-pointer transition-colors">
                <CardHeader>
                  <Calendar className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Daily Challenge</CardTitle>
                  <CardDescription>Solve today's featured problem</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/coding/problems">
              <Card className="hover:bg-accent cursor-pointer transition-colors">
                <CardHeader>
                  <Code2 className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Problem Set</CardTitle>
                  <CardDescription>Browse 500+ coding problems</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/coding/progress">
              <Card className="hover:bg-accent cursor-pointer transition-colors">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Track Progress</CardTitle>
                  <CardDescription>View detailed analytics</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Progress by Topic</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <CardTitle className="text-base">{category.name}</CardTitle>
                          <CardDescription>
                            {category.solved}/{category.total} solved
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{Math.round((category.solved / category.total) * 100)}%</span>
                        <Badge variant="secondary">{category.total - category.solved} left</Badge>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(category.solved / category.total) * 100}%` }}
                        />
                      </div>
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
