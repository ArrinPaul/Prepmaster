import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const posts = [
  {
    slug: "mastering-system-design-interviews",
    title: "Mastering System Design Interviews: A Complete Guide",
    excerpt: "Learn the key principles and strategies for acing system design interviews at top tech companies.",
    category: "Interview Tips",
    date: "2024-01-15",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop",
  },
  {
    slug: "top-10-coding-patterns",
    title: "Top 10 Coding Patterns You Must Know",
    excerpt: "Essential coding patterns that appear in 90% of technical interview questions.",
    category: "Coding",
    date: "2024-01-12",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=400&fit=crop",
  },
  {
    slug: "behavioral-interview-framework",
    title: "The STAR Method: Ace Your Behavioral Interviews",
    excerpt: "Master the STAR framework to structure compelling answers to behavioral questions.",
    category: "Behavioral",
    date: "2024-01-10",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  {
    slug: "salary-negotiation-guide",
    title: "Salary Negotiation: Get the Offer You Deserve",
    excerpt: "Strategic tips for negotiating your salary and benefits package with confidence.",
    category: "Career",
    date: "2024-01-08",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
  },
  {
    slug: "leetcode-study-plan",
    title: "The Ultimate LeetCode Study Plan",
    excerpt: "A structured 8-week plan to systematically prepare for coding interviews.",
    category: "Coding",
    date: "2024-01-05",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
  },
  {
    slug: "faang-interview-experience",
    title: "My FAANG Interview Journey: Lessons Learned",
    excerpt: "Real experiences and insights from interviewing at Google, Meta, and Amazon.",
    category: "Experience",
    date: "2024-01-03",
    readTime: "20 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Blog & Insights
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Expert tips, interview experiences, and career advice to help you succeed.
              </p>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search articles..." className="pl-10" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
