"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Bell, Lock, CreditCard, Palette, Shield, Database, Zap, Key, Globe } from "lucide-react";
import Link from "next/link";

const settingsCategories = [
  {
    title: "Account",
    description: "Manage your account settings and preferences",
    icon: User,
    href: "/settings/account",
  },
  {
    title: "Notifications",
    description: "Configure notification preferences",
    icon: Bell,
    href: "/settings/notifications",
  },
  {
    title: "Privacy",
    description: "Control your privacy and data settings",
    icon: Lock,
    href: "/settings/privacy",
  },
  {
    title: "Billing",
    description: "Manage subscription and payment methods",
    icon: CreditCard,
    href: "/settings/billing",
  },
  {
    title: "Appearance",
    description: "Customize theme and display settings",
    icon: Palette,
    href: "/settings/appearance",
  },
  {
    title: "Security",
    description: "Password and security options",
    icon: Shield,
    href: "/settings/security",
  },
  {
    title: "Integrations",
    description: "Connect third-party services",
    icon: Zap,
    href: "/settings/integrations",
  },
  {
    title: "API Keys",
    description: "Manage API access and keys",
    icon: Key,
    href: "/settings/api",
  },
  {
    title: "Data Export",
    description: "Download your data",
    icon: Database,
    href: "/settings/data",
  },
];

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold">Settings</h1>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {settingsCategories.map((category, index) => (
              <Link key={index} href={category.href}>
                <Card className="hover:bg-accent cursor-pointer transition-colors h-full">
                  <CardHeader>
                    <category.icon className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
