"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Code2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    targetCompanies: [] as string[],
    goals: [] as string[],
  });

  const companies = ["Google", "Meta", "Amazon", "Microsoft", "Apple", "Netflix", "Other"];
  const goals = [
    "Improve coding skills",
    "Practice system design",
    "Prepare for interviews",
    "Learn new technologies",
    "Build projects",
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleCompany = (company: string) => {
    setFormData({
      ...formData,
      targetCompanies: formData.targetCompanies.includes(company)
        ? formData.targetCompanies.filter((c) => c !== company)
        : [...formData.targetCompanies, company],
    });
  };

  const toggleGoal = (goal: string) => {
    setFormData({
      ...formData,
      goals: formData.goals.includes(goal)
        ? formData.goals.filter((g) => g !== goal)
        : [...formData.goals, goal],
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <Code2 className="h-6 w-6" />
            <span className="font-bold text-xl">PrepMaster</span>
          </Link>
          <CardTitle className="text-2xl">Welcome to PrepMaster!</CardTitle>
          <CardDescription>
            Let's personalize your experience (Step {step} of 3)
          </CardDescription>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">What's your current role?</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="entry">Entry Level Engineer</SelectItem>
                    <SelectItem value="mid">Mid-Level Engineer</SelectItem>
                    <SelectItem value="senior">Senior Engineer</SelectItem>
                    <SelectItem value="lead">Tech Lead / Manager</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of coding experience?</Label>
                <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">Less than 1 year</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Label>Which companies are you targeting?</Label>
              <p className="text-sm text-muted-foreground">Select all that apply</p>
              <div className="grid grid-cols-2 gap-3">
                {companies.map((company) => (
                  <div key={company} className="flex items-center space-x-2">
                    <Checkbox
                      id={company}
                      checked={formData.targetCompanies.includes(company)}
                      onCheckedChange={() => toggleCompany(company)}
                    />
                    <label
                      htmlFor={company}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {company}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Label>What are your main goals?</Label>
              <p className="text-sm text-muted-foreground">Select all that apply</p>
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={formData.goals.includes(goal)}
                      onCheckedChange={() => toggleGoal(goal)}
                    />
                    <label
                      htmlFor={goal}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {goal}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
            )}
            <Button onClick={handleNext} className="flex-1">
              {step === 3 ? "Complete" : "Continue"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {step === 1 && (
            <div className="mt-6 text-center">
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
                Skip for now
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
