import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Mock data - in real app, fetch based on slug
  const post = {
    title: "Mastering System Design Interviews: A Complete Guide",
    category: "Interview Tips",
    date: "2024-01-15",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop",
    author: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      role: "Senior Software Engineer"
    },
    content: `
      <h2>Introduction</h2>
      <p>System design interviews are often the most challenging part of the technical interview process at top tech companies. They require not just coding skills, but also the ability to think about scalability, reliability, and trade-offs.</p>
      
      <h2>Key Principles</h2>
      <p>When approaching system design problems, keep these core principles in mind:</p>
      <ul>
        <li><strong>Scalability:</strong> How will your system handle growth?</li>
        <li><strong>Reliability:</strong> What happens when things fail?</li>
        <li><strong>Maintainability:</strong> Can other engineers work with your design?</li>
        <li><strong>Performance:</strong> How fast does it need to be?</li>
      </ul>

      <h2>The Framework</h2>
      <p>Use this step-by-step framework to tackle any system design interview:</p>
      <ol>
        <li>Clarify requirements (5-10 minutes)</li>
        <li>Estimate scale (5 minutes)</li>
        <li>Design high-level architecture (10-15 minutes)</li>
        <li>Deep dive into components (15-20 minutes)</li>
        <li>Identify bottlenecks and optimize (5-10 minutes)</li>
      </ol>

      <h2>Common Patterns</h2>
      <p>Familiarize yourself with these common architectural patterns:</p>
      <ul>
        <li>Load balancing</li>
        <li>Caching strategies</li>
        <li>Database sharding</li>
        <li>Content Delivery Networks (CDNs)</li>
        <li>Message queues</li>
        <li>Microservices architecture</li>
      </ul>

      <h2>Practice Problems</h2>
      <p>Start with these classic system design problems:</p>
      <ul>
        <li>Design a URL shortener</li>
        <li>Design a social media feed</li>
        <li>Design a ride-sharing service</li>
        <li>Design a video streaming platform</li>
      </ul>

      <h2>Conclusion</h2>
      <p>System design interviews are about demonstrating your ability to think through complex problems systematically. Practice regularly, study real-world systems, and don't forget to communicate your thought process clearly during the interview.</p>
    `
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <article className="py-12">
          <div className="container max-w-4xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="mb-8">
              <Badge variant="secondary" className="mb-4">{post.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex items-center gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.author.role}</p>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="relative h-96 w-full mb-12 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            <Separator className="mb-8" />

            <div 
              className="prose prose-neutral dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <Separator className="my-12" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Written by</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.author.role}</p>
                  </div>
                </div>
              </div>

              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share Article
              </Button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
