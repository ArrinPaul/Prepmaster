import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ThumbsUp, ThumbsDown } from "lucide-react";
import Link from "next/link";

export default function HelpArticlePage({ 
  params 
}: { 
  params: { category: string; article: string } 
}) {
  // Mock data
  const article = {
    title: "How to Create an Account",
    lastUpdated: "2024-01-15",
    content: `
      <h2>Creating Your Account</h2>
      <p>Getting started with PrepMaster is easy! Follow these simple steps to create your account and begin your interview preparation journey.</p>

      <h3>Step 1: Visit the Sign-Up Page</h3>
      <p>Navigate to the sign-up page by clicking the "Get Started" button on the homepage or going directly to /auth/signup.</p>

      <h3>Step 2: Enter Your Information</h3>
      <p>Provide the following information:</p>
      <ul>
        <li>Full name</li>
        <li>Email address</li>
        <li>Password (at least 8 characters)</li>
      </ul>

      <h3>Step 3: Verify Your Email</h3>
      <p>After submitting the form, you'll receive a verification email. Click the link in the email to verify your account.</p>

      <h3>Step 4: Complete Your Profile</h3>
      <p>Once verified, you'll be guided through a brief onboarding process to set up your profile and preferences.</p>

      <h2>Troubleshooting</h2>
      <p>If you don't receive the verification email:</p>
      <ul>
        <li>Check your spam folder</li>
        <li>Make sure you entered the correct email address</li>
        <li>Request a new verification email from the login page</li>
      </ul>

      <h2>Next Steps</h2>
      <p>After creating your account, we recommend:</p>
      <ul>
        <li>Completing your profile</li>
        <li>Taking your first mock interview</li>
        <li>Exploring the coding problems library</li>
        <li>Setting your interview preparation goals</li>
      </ul>
    `
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <article className="container max-w-4xl">
          <Link 
            href={`/help/${params.category}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {params.category}
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date(article.lastUpdated).toLocaleDateString()}
            </p>
          </div>

          <Separator className="mb-8" />

          <div 
            className="prose prose-neutral dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <Separator className="my-12" />

          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Was this article helpful?</h3>
            <div className="flex gap-4">
              <Button variant="outline">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Yes
              </Button>
              <Button variant="outline">
                <ThumbsDown className="h-4 w-4 mr-2" />
                No
              </Button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
