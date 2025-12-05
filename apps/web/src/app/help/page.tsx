import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, CreditCard, Settings, HelpCircle, Shield, Zap } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Learn the basics and set up your account",
    icon: BookOpen,
    articleCount: 12,
  },
  {
    slug: "billing",
    title: "Billing & Subscriptions",
    description: "Manage your plan and payment methods",
    icon: CreditCard,
    articleCount: 8,
  },
  {
    slug: "account",
    title: "Account Settings",
    description: "Customize your profile and preferences",
    icon: Settings,
    articleCount: 15,
  },
  {
    slug: "interviews",
    title: "Interviews",
    description: "Tips for using interview features",
    icon: HelpCircle,
    articleCount: 20,
  },
  {
    slug: "security",
    title: "Security & Privacy",
    description: "Keep your account safe and secure",
    icon: Shield,
    articleCount: 10,
  },
  {
    slug: "features",
    title: "Features & Tools",
    description: "Get the most out of PrepMaster",
    icon: Zap,
    articleCount: 25,
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How can we help?
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Search our knowledge base or browse categories below
              </p>
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search for articles..." 
                  className="pl-12 h-14 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Browse by Category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {categories.map((category) => (
                <Link key={category.slug} href={`/help/${category.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <category.icon className="h-10 w-10 mb-4 text-primary" />
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {category.articleCount} articles
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Still need help?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <Link href="/contact">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                  Contact Support
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
