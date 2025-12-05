"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Clock, Star, Users } from "lucide-react";
import Link from "next/link";

const courses = [
  {
    id: "1",
    title: "Data Structures & Algorithms Mastery",
    description: "Master the fundamentals of DSA with comprehensive lessons and practice problems",
    level: "Beginner",
    duration: "40 hours",
    lessons: 120,
    students: 12500,
    rating: 4.8,
    progress: 45,
  },
  {
    id: "2",
    title: "System Design Interview Prep",
    description: "Learn to design scalable systems and ace system design interviews",
    level: "Advanced",
    duration: "25 hours",
    lessons: 45,
    students: 8900,
    rating: 4.9,
    progress: 0,
  },
  {
    id: "3",
    title: "Dynamic Programming Patterns",
    description: "Master DP through pattern recognition and systematic problem-solving",
    level: "Intermediate",
    duration: "30 hours",
    lessons: 75,
    students: 6700,
    rating: 4.7,
    progress: 20,
  },
  {
    id: "4",
    title: "Object-Oriented Design",
    description: "Design patterns, SOLID principles, and practical OOP examples",
    level: "Intermediate",
    duration: "20 hours",
    lessons: 50,
    students: 5400,
    rating: 4.6,
    progress: 0,
  },
];

export default function CoursesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold">Courses</h1>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search courses..." className="pl-10" />
          </div>

          {/* In Progress */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Continue Learning</h2>
              <Link href="/courses/saved">
                <Button variant="outline" size="sm">View Saved</Button>
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {courses.filter(c => c.progress > 0).map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="mb-2">{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{course.level}</Badge>
                      <Badge variant="outline">{course.lessons} lessons</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-semibold">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <Link href={`/courses/${course.id}`}>
                        <Button className="w-full">Continue Learning</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Courses */}
          <div>
            <h2 className="text-2xl font-bold mb-4">All Courses</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="mb-2">{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{course.level}</Badge>
                      <Badge variant="outline">{course.lessons} lessons</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {(course.students / 1000).toFixed(1)}k
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-warning text-warning" />
                          {course.rating}
                        </div>
                      </div>
                      <Link href={`/courses/${course.id}`}>
                        <Button variant="outline" className="w-full">
                          {course.progress > 0 ? "Continue" : "Start Course"}
                        </Button>
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
