"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageSquare, Share2, Bookmark, Code2, Trophy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const posts = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    content: "Just solved my 100th LeetCode problem! The journey from 0 to 100 taught me so much about algorithms and problem-solving. Key takeaway: consistency beats intensity. 🎉",
    timestamp: "2 hours ago",
    likes: 45,
    comments: 12,
    type: "achievement",
  },
  {
    id: "2",
    author: {
      name: "Michael Rodriguez",
      username: "miker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    content: "Anyone else find Dynamic Programming challenging at first? After solving 30+ DP problems, I finally see the patterns. Would love to hear how others approached learning DP!",
    timestamp: "5 hours ago",
    likes: 28,
    comments: 34,
    type: "discussion",
  },
  {
    id: "3",
    author: {
      name: "Emily Thompson",
      username: "emilyt",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
    content: "Just completed a mock interview session. The AI feedback is incredibly detailed! It caught things I didn't even realize I was doing wrong. Highly recommend trying it out.",
    timestamp: "1 day ago",
    likes: 67,
    comments: 18,
    type: "review",
  },
];

export default function FeedPage() {
  const [newPost, setNewPost] = useState("");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold">Social Feed</h1>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 max-w-3xl mx-auto w-full">
          {/* Create Post */}
          <Card>
            <CardHeader>
              <CardTitle>Share your progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What are you working on?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={3}
              />
              <Button>Post</Button>
            </CardContent>
          </Card>

          {/* Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{post.author.name}</p>
                        <p className="text-sm text-muted-foreground">
                          @{post.author.username} • {post.timestamp}
                        </p>
                      </div>
                    </div>
                    {post.type === "achievement" && (
                      <Trophy className="h-5 w-5 text-warning" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{post.content}</p>
                  
                  <div className="flex items-center gap-4 pt-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      {post.likes}
                    </Button>
                    <Link href={`/feed/${post.id}`}>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {post.comments}
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
