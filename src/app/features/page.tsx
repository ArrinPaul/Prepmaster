import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Code2, Building2, BookOpen, Briefcase, Trophy, Brain, Users, Target, BarChart3, Calendar, Zap } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Video,
    title: "AI Mock Interviews",
    description: "Practice with AI-powered interviews that simulate real technical interviews with instant feedback and analysis.",
  },
  {
    icon: Code2,
    title: "Coding Challenges",
    description: "Solve hundreds of coding problems with multiple difficulty levels, detailed solutions, and performance tracking.",
  },
  {
    icon: Building2,
    title: "Company-Specific Prep",
    description: "Access curated questions and interview experiences from top tech companies like Google, Meta, and Amazon.",
  },
  {
    icon: BookOpen,
    title: "Learning Paths",
    description: "Follow structured roadmaps and courses designed to build your skills systematically from beginner to expert.",
  },
  {
    icon: Briefcase,
    title: "Resume Builder",
    description: "Create ATS-friendly resumes with AI-powered suggestions and analysis to land more interviews.",
  },
  {
    icon: Trophy,
    title: "Achievements & Gamification",
    description: "Stay motivated with streaks, badges, and leaderboards as you progress through your interview preparation.",
  },
  {
    icon: Brain,
    title: "Adaptive Learning",
    description: "AI adapts to your skill level and learning pace, providing personalized recommendations and challenges.",
  },
  {
    icon: Users,
    title: "Community & Collaboration",
    description: "Connect with other learners, share projects, and learn from peer experiences and insights.",
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set and track your preparation goals with detailed progress analytics and milestone celebrations.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Get detailed insights into your strengths and weaknesses with comprehensive performance metrics.",
  },
  {
    icon: Calendar,
    title: "Study Scheduling",
    description: "Plan your preparation with an integrated calendar and smart reminders to stay on track.",
  },
  {
    icon: Zap,
    title: "Real-time Feedback",
    description: "Receive instant feedback on your code, interview responses, and problem-solving approaches.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Everything You Need to Ace Your Interview
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                PrepMaster provides a comprehensive suite of tools and resources to help you prepare for technical interviews and land your dream job.
              </p>
              <Link href="/auth/signup">
                <Button size="lg">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <feature.icon className="h-10 w-10 mb-4 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of developers who are preparing for their dream jobs with PrepMaster.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button size="lg">Get Started Free</Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline">View Pricing</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
