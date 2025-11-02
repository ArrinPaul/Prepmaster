'use client';

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Code2, Building2, BookOpen, Zap, Users, ArrowRight, CheckCircle2, Star, PlayCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/ui/animated-hero";
import {
  VideoModal,
  VideoModalContent,
  VideoModalDescription,
  VideoModalTitle,
  VideoModalTrigger,
  VideoModalVideo,
  VideoPlayButton,
  VideoPlayer,
  VideoPreview,
} from "@/components/ui/video-modal";
import Pricing from "@/components/ui/pricing";
import { ContactPage } from "@/components/ui/contact-page";

const features = [
  {
    icon: Video,
    title: "AI Mock Interviews",
    description: "Practice with AI-powered interviews that provide real-time feedback",
  },
  {
    icon: Code2,
    title: "Coding Challenges",
    description: "Solve 500+ problems with detailed solutions and explanations",
  },
  {
    icon: Building2,
    title: "Company Prep",
    description: "Access company-specific questions from Google, Meta, Amazon & more",
  },
  {
    icon: BookOpen,
    title: "Learning Paths",
    description: "Follow curated roadmaps designed by industry experts",
  },
  {
    icon: Zap,
    title: "Real-time Feedback",
    description: "Get instant analysis on your code and interview responses",
  },
  {
    icon: Users,
    title: "Community",
    description: "Learn from thousands of developers on the same journey",
  },
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "500+", label: "Coding Problems" },
  { value: "100+", label: "Companies" },
  { value: "95%", label: "Success Rate" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    content: "PrepMaster helped me land my dream job at Google. The AI mock interviews were incredibly realistic and the feedback was invaluable.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Senior Developer at Meta",
    content: "The coding challenges are well-structured and the company-specific prep helped me understand what to expect in real interviews.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    rating: 5,
  },
  {
    name: "Emily Thompson",
    role: "Full Stack Engineer at Amazon",
    content: "Best investment in my career. The platform is comprehensive and the community support is amazing.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Animated Hero Section */}
        <Hero />

        {/* Video Modal Demo Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                See How It Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Watch our platform demo to understand how PrepMaster can help you ace your interviews
              </p>
            </div>
            <div className="flex justify-center">
              <VideoModal>
                <VideoModalTrigger asChild>
                  <Button size="lg">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </VideoModalTrigger>
                <VideoModalContent>
                  <VideoModalTitle>Platform Demo</VideoModalTitle>
                  <VideoModalDescription>
                    Discover all the features that will help you succeed
                  </VideoModalDescription>
                  <VideoModalVideo>
                    <VideoPlayer>
                      <VideoPreview>
                        <img
                          src="https://cdn.dribbble.com/userupload/4145843/file/original-c7a2c9a768450460259f232259d103d2.png?resize=1600x1200"
                          alt="Video preview"
                          className="w-full h-full object-cover"
                        />
                      </VideoPreview>
                      <VideoPlayButton>
                        <button className="absolute inset-0 m-auto flex size-32 items-center justify-center rounded-full border border-white border-white/10 bg-white/50 transition duration-300 hover:bg-white/75">
                          <PlayCircle className="size-20 stroke-1 text-white" />
                        </button>
                      </VideoPlayButton>
                      <iframe
                        className="size-full"
                        src="https://cdn.magicui.design/globe.mp4"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen
                      />
                    </VideoPlayer>
                  </VideoModalVideo>
                </VideoModalContent>
              </VideoModal>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-y bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl font-bold mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools and resources designed to help you ace technical interviews
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 mb-4 text-primary" />
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

        {/* How It Works Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How PrepMaster Works
              </h2>
              <p className="text-xl text-muted-foreground">
                Your path to interview success in 3 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                <p className="text-muted-foreground">
                  Set your goals and let our AI personalize your learning path
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Practice & Learn</h3>
                <p className="text-muted-foreground">
                  Solve problems, take mock interviews, and track your progress
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Land Your Job</h3>
                <p className="text-muted-foreground">
                  Apply with confidence and ace your interviews
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Loved by Developers Worldwide
              </h2>
              <p className="text-xl text-muted-foreground">
                See what our users have to say about PrepMaster
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{testimonial.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <Pricing />

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of developers preparing for their dream jobs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" asChild>
                  <Link href="/auth/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pricing">
                    View Pricing
                  </Link>
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactPage />
      </main>

      <Footer />
    </div>
  );
}