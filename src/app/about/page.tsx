import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Zap, Heart } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Community First",
    description: "We believe in the power of community and collaboration in the learning journey.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We're committed to providing the highest quality interview preparation resources.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We leverage cutting-edge AI technology to personalize your learning experience.",
  },
  {
    icon: Heart,
    title: "Accessibility",
    description: "Quality interview prep should be accessible to everyone, everywhere.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About PrepMaster
              </h1>
              <p className="text-xl text-muted-foreground">
                Empowering developers worldwide to ace their technical interviews and land their dream jobs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                PrepMaster was founded with a simple mission: to democratize access to high-quality technical interview preparation. We understand that landing your dream job shouldn't depend on expensive bootcamps or premium coaching services.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Our platform combines artificial intelligence, community wisdom, and comprehensive learning resources to provide an affordable, effective, and personalized interview preparation experience for developers at all levels.
              </p>
              <p className="text-lg text-muted-foreground">
                Whether you're a fresh graduate preparing for your first technical interview or an experienced developer aiming for a senior role at a top tech company, PrepMaster has the tools and resources you need to succeed.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <value.icon className="h-10 w-10 mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6">
                PrepMaster was born out of our own frustrating experiences with technical interview preparation. As developers, we struggled to find a comprehensive platform that combined quality content, realistic practice, and actionable feedback.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                After spending countless hours on fragmented resources and expensive services, we decided to build the platform we wished we had. Launched in 2024, PrepMaster has quickly grown to serve thousands of developers worldwide.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we're proud to be one of the most comprehensive interview preparation platforms, trusted by developers at companies ranging from startups to Fortune 500 companies.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
