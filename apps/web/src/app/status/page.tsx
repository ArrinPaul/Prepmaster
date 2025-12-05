"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

const services = [
  {
    name: "API",
    status: "operational",
    uptime: "99.99%",
    responseTime: "45ms",
  },
  {
    name: "Web Application",
    status: "operational",
    uptime: "99.98%",
    responseTime: "120ms",
  },
  {
    name: "AI Interview Engine",
    status: "operational",
    uptime: "99.95%",
    responseTime: "850ms",
  },
  {
    name: "Code Execution Service",
    status: "operational",
    uptime: "99.97%",
    responseTime: "320ms",
  },
  {
    name: "Database",
    status: "operational",
    uptime: "99.99%",
    responseTime: "12ms",
  },
  {
    name: "Authentication Service",
    status: "operational",
    uptime: "99.99%",
    responseTime: "35ms",
  },
];

const incidents = [
  {
    title: "Scheduled Maintenance",
    description: "Database optimization and upgrades",
    status: "scheduled",
    date: "2024-01-20",
    duration: "2 hours",
  },
  {
    title: "Resolved: Intermittent Login Issues",
    description: "Some users experienced login delays due to authentication service congestion",
    status: "resolved",
    date: "2024-01-15",
    duration: "45 minutes",
  },
  {
    title: "Resolved: Code Editor Performance",
    description: "Code editor was experiencing slow syntax highlighting",
    status: "resolved",
    date: "2024-01-10",
    duration: "30 minutes",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "operational":
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    case "degraded":
      return <AlertCircle className="h-5 w-5 text-warning" />;
    case "down":
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    default:
      return <CheckCircle2 className="h-5 w-5 text-success" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "operational":
      return <Badge className="bg-success text-success-foreground">Operational</Badge>;
    case "degraded":
      return <Badge className="bg-warning text-warning-foreground">Degraded</Badge>;
    case "down":
      return <Badge variant="destructive">Down</Badge>;
    case "scheduled":
      return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Scheduled</Badge>;
    case "resolved":
      return <Badge variant="outline">Resolved</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function StatusPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle2 className="h-8 w-8 text-success" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  All Systems Operational
                </h1>
              </div>
              <p className="text-xl text-muted-foreground">
                Current system status and uptime information
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Services</h2>
            
            <div className="space-y-4">
              {services.map((service) => (
                <Card key={service.name}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(service.status)}
                        <div>
                          <h3 className="font-semibold">{service.name}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span>Uptime: {service.uptime}</span>
                            <span>•</span>
                            <span>Response: {service.responseTime}</span>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(service.status)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Recent Incidents</h2>
            
            <div className="space-y-6">
              {incidents.map((incident, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{incident.title}</CardTitle>
                      {getStatusBadge(incident.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{incident.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{new Date(incident.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Duration: {incident.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle>Uptime Statistics (Last 90 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-3xl font-bold text-success">99.98%</p>
                    <p className="text-sm text-muted-foreground">Overall Uptime</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Major Incidents</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">Minor Incidents</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">165ms</p>
                    <p className="text-sm text-muted-foreground">Avg Response</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
