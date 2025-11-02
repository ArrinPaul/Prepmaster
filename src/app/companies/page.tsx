"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Building2, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

const companies = [
  {
    slug: "google",
    name: "Google",
    logo: "🔵",
    questions: 245,
    interviews: 1234,
    difficulty: "Hard",
    tags: ["FAANG", "Tech Giant"],
  },
  {
    slug: "meta",
    name: "Meta",
    logo: "🔷",
    questions: 198,
    interviews: 987,
    difficulty: "Hard",
    tags: ["FAANG", "Social Media"],
  },
  {
    slug: "amazon",
    name: "Amazon",
    logo: "🟠",
    questions: 312,
    interviews: 1456,
    difficulty: "Medium",
    tags: ["FAANG", "E-commerce"],
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    logo: "🟦",
    questions: 278,
    interviews: 1123,
    difficulty: "Medium",
    tags: ["FAANG", "Enterprise"],
  },
  {
    slug: "apple",
    name: "Apple",
    logo: "⚫",
    questions: 156,
    interviews: 876,
    difficulty: "Hard",
    tags: ["FAANG", "Hardware"],
  },
  {
    slug: "netflix",
    name: "Netflix",
    logo: "🔴",
    questions: 89,
    interviews: 543,
    difficulty: "Hard",
    tags: ["FAANG", "Streaming"],
  },
];

export default function CompaniesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold">Companies</h1>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search companies..." className="pl-10" />
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100+</div>
                <p className="text-xs text-muted-foreground">From startups to FAANG</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Interview Questions</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,500+</div>
                <p className="text-xs text-muted-foreground">Real interview questions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">User Experiences</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10,000+</div>
                <p className="text-xs text-muted-foreground">Shared by the community</p>
              </CardContent>
            </Card>
          </div>

          {/* Company Grid */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Popular Companies</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => (
                <Link key={company.slug} href={`/companies/${company.slug}`}>
                  <Card className="hover:bg-accent cursor-pointer transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl">{company.logo}</span>
                        <div>
                          <CardTitle>{company.name}</CardTitle>
                          <CardDescription>{company.questions} questions</CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {company.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                        <Badge
                          variant={
                            company.difficulty === "Hard"
                              ? "destructive"
                              : company.difficulty === "Medium"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {company.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {company.interviews.toLocaleString()} interview experiences
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
