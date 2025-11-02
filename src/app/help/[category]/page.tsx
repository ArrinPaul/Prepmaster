import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

export default function HelpCategoryPage({ params }: { params: { category: string } }) {
  // Mock data - in real app, fetch based on category
  const category = {
    title: "Getting Started",
    description: "Learn the basics and set up your account",
  };

  const articles = [
    {
      slug: "create-account",
      title: "How to Create an Account",
      description: "Step-by-step guide to signing up for PrepMaster",
    },
    {
      slug: "first-interview",
      title: "Starting Your First Mock Interview",
      description: "Learn how to begin your interview preparation journey",
    },
    {
      slug: "navigation",
      title: "Navigating the Platform",
      description: "Overview of the main features and where to find them",
    },
    {
      slug: "profile-setup",
      title: "Setting Up Your Profile",
      description: "Customize your profile to match your goals",
    },
    {
      slug: "study-plan",
      title: "Creating a Study Plan",
      description: "How to plan your interview preparation effectively",
    },
    {
      slug: "mobile-app",
      title: "Using the Mobile App",
      description: "Practice on the go with our mobile applications",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <Link 
            href="/help" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Help Center
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
            <p className="text-xl text-muted-foreground">{category.description}</p>
          </div>

          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/help/${params.category}/${article.slug}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <FileText className="h-6 w-6 text-primary mt-1" />
                      <div className="flex-1">
                        <CardTitle className="mb-2">{article.title}</CardTitle>
                        <CardDescription>{article.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
