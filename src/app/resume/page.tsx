"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2, AlertCircle, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";

const resumes = [
  {
    id: "1",
    name: "Software_Engineer_Resume_2024.pdf",
    uploadDate: "2024-01-15",
    score: 85,
    status: "analyzed",
    issues: 3,
    suggestions: 8,
  },
  {
    id: "2",
    name: "Resume_v2.pdf",
    uploadDate: "2024-01-10",
    score: 72,
    status: "analyzed",
    issues: 7,
    suggestions: 12,
  },
];

export default function ResumePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center justify-between flex-1">
            <h1 className="text-xl font-semibold">Resume Analysis</h1>
            <Link href="/resume/builder">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Resume
              </Button>
            </Link>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Upload Section */}
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              <CardTitle className="mb-2">Upload Your Resume</CardTitle>
              <CardDescription className="mb-4 text-center max-w-md">
                Get AI-powered analysis and suggestions to improve your resume for ATS systems
              </CardDescription>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Supports PDF, DOC, DOCX (Max 5MB)
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CheckCircle2 className="h-8 w-8 mb-2 text-success" />
                <CardTitle className="text-base">ATS Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ensure your resume passes Applicant Tracking Systems
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="text-base">Score Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get detailed scoring on format, content, and keywords
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <AlertCircle className="h-8 w-8 mb-2 text-warning" />
                <CardTitle className="text-base">Smart Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Receive actionable tips to improve your resume
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Previous Resumes */}
          {resumes.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Resumes</h2>
              <div className="space-y-4">
                {resumes.map((resume) => (
                  <Card key={resume.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <CardTitle className="text-base">{resume.name}</CardTitle>
                            <CardDescription>
                              Uploaded {new Date(resume.uploadDate).toLocaleDateString()}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{resume.score}%</div>
                          <p className="text-xs text-muted-foreground">ATS Score</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-sm">
                          <span className="flex items-center gap-1 text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            {resume.issues} issues
                          </span>
                          <span className="flex items-center gap-1 text-success">
                            <CheckCircle2 className="h-4 w-4" />
                            {resume.suggestions} suggestions
                          </span>
                        </div>
                        <Link href={`/resume/${resume.id}`}>
                          <Button variant="outline">View Analysis</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
