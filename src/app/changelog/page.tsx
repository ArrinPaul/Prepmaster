import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const releases = [
  {
    version: "2.5.0",
    date: "2024-01-15",
    changes: [
      { type: "new", description: "AI-powered code review in interview sessions" },
      { type: "new", description: "Company-specific interview prep tracks" },
      { type: "improvement", description: "Enhanced analytics dashboard with more metrics" },
      { type: "fix", description: "Fixed issue with code editor syntax highlighting" },
    ]
  },
  {
    version: "2.4.0",
    date: "2024-01-08",
    changes: [
      { type: "new", description: "Daily coding challenges feature" },
      { type: "new", description: "Social feed for sharing progress" },
      { type: "improvement", description: "Faster interview session loading times" },
      { type: "improvement", description: "Updated UI with improved accessibility" },
      { type: "fix", description: "Resolved mobile app crash on iOS" },
    ]
  },
  {
    version: "2.3.0",
    date: "2024-01-01",
    changes: [
      { type: "new", description: "Resume builder and analysis tool" },
      { type: "new", description: "Job search integration" },
      { type: "improvement", description: "Better mobile responsiveness across all pages" },
      { type: "fix", description: "Fixed timezone issues in calendar" },
    ]
  },
  {
    version: "2.2.0",
    date: "2023-12-20",
    changes: [
      { type: "new", description: "Achievements and badges system" },
      { type: "new", description: "Leaderboard feature" },
      { type: "improvement", description: "Enhanced code editor with vim mode" },
      { type: "improvement", description: "Performance optimizations for large codebases" },
      { type: "fix", description: "Fixed notification delivery issues" },
    ]
  },
];

const getBadgeVariant = (type: string) => {
  switch (type) {
    case "new":
      return "default";
    case "improvement":
      return "secondary";
    case "fix":
      return "outline";
    default:
      return "secondary";
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "new":
      return "New";
    case "improvement":
      return "Improved";
    case "fix":
      return "Fixed";
    default:
      return type;
  }
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Changelog
              </h1>
              <p className="text-xl text-muted-foreground">
                Track all updates, new features, and improvements to PrepMaster
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-4xl">
            <div className="space-y-12">
              {releases.map((release) => (
                <Card key={release.version}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle>Version {release.version}</CardTitle>
                      <span className="text-sm text-muted-foreground">
                        {new Date(release.date).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {release.changes.map((change, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Badge variant={getBadgeVariant(change.type)} className="mt-0.5">
                            {getTypeLabel(change.type)}
                          </Badge>
                          <span className="flex-1">{change.description}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
