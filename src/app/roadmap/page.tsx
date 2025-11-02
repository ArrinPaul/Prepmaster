import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare } from "lucide-react";

const roadmapItems = [
  {
    quarter: "Q1 2024",
    status: "in-progress",
    items: [
      {
        title: "Advanced AI Interview Coach",
        description: "Personalized feedback with emotion detection and communication analysis",
        votes: 245,
        comments: 32,
      },
      {
        title: "Mobile App Launch",
        description: "Native iOS and Android apps for on-the-go preparation",
        votes: 189,
        comments: 28,
      },
      {
        title: "Team Collaboration Features",
        description: "Share progress and compete with study groups",
        votes: 156,
        comments: 19,
      },
    ],
  },
  {
    quarter: "Q2 2024",
    status: "planned",
    items: [
      {
        title: "Video Interview Practice",
        description: "Record and review your video interview responses",
        votes: 312,
        comments: 45,
      },
      {
        title: "Custom Learning Paths",
        description: "AI-generated study plans based on your target role",
        votes: 267,
        comments: 38,
      },
      {
        title: "Integration with LinkedIn",
        description: "Import your profile and get targeted interview prep",
        votes: 198,
        comments: 24,
      },
    ],
  },
  {
    quarter: "Q3 2024",
    status: "planned",
    items: [
      {
        title: "Live Mock Interviews",
        description: "Practice with real interviewers from top companies",
        votes: 421,
        comments: 67,
      },
      {
        title: "API Access",
        description: "Developer API for custom integrations",
        votes: 143,
        comments: 18,
      },
      {
        title: "Advanced Analytics Dashboard",
        description: "Deep insights into your preparation patterns",
        votes: 178,
        comments: 22,
      },
    ],
  },
  {
    quarter: "Q4 2024",
    status: "planned",
    items: [
      {
        title: "Certification Programs",
        description: "Earn verified certificates for completed learning paths",
        votes: 234,
        comments: 31,
      },
      {
        title: "Company Partnerships",
        description: "Direct interview opportunities with partner companies",
        votes: 389,
        comments: 52,
      },
    ],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "in-progress":
      return "bg-warning text-warning-foreground";
    case "planned":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "in-progress":
      return "In Progress";
    case "planned":
      return "Planned";
    default:
      return status;
  }
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Product Roadmap
              </h1>
              <p className="text-xl text-muted-foreground">
                See what we're building next and vote on features you'd like to see
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-6xl">
            <div className="space-y-12">
              {roadmapItems.map((quarter) => (
                <div key={quarter.quarter}>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-3xl font-bold">{quarter.quarter}</h2>
                    <Badge className={getStatusColor(quarter.status)}>
                      {getStatusLabel(quarter.status)}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quarter.items.map((item, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm">
                              <ThumbsUp className="h-4 w-4 mr-2" />
                              {item.votes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              {item.comments}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Have a Feature Request?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We'd love to hear your ideas! Share your suggestions and vote on features.
              </p>
              <Button size="lg">Submit Feature Request</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
