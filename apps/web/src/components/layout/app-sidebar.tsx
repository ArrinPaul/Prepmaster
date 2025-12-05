"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  Code2,
  Building2,
  BookOpen,
  Users,
  Briefcase,
  Activity,
  Settings,
  Target,
  Trophy,
  Calendar,
  FileText,
  BarChart3,
  Lightbulb,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  {
    title: "Main",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
      { title: "Interviews", icon: Video, href: "/interviews" },
      { title: "Coding", icon: Code2, href: "/coding" },
      { title: "Companies", icon: Building2, href: "/companies" },
    ],
  },
  {
    title: "Learning",
    items: [
      { title: "Courses", icon: BookOpen, href: "/courses" },
      { title: "Roadmaps", icon: Target, href: "/roadmaps" },
      { title: "Projects", icon: Lightbulb, href: "/ideas" },
    ],
  },
  {
    title: "Career",
    items: [
      { title: "Resume", icon: FileText, href: "/resume" },
      { title: "Jobs", icon: Briefcase, href: "/jobs" },
      { title: "Feed", icon: MessageSquare, href: "/feed" },
    ],
  },
  {
    title: "Progress",
    items: [
      { title: "Activity", icon: Activity, href: "/activity" },
      { title: "Goals", icon: Target, href: "/goals" },
      { title: "Achievements", icon: Trophy, href: "/achievements" },
      { title: "Analytics", icon: BarChart3, href: "/analytics" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Code2 className="h-6 w-6" />
          <span className="font-bold text-lg">PrepMaster</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href || pathname?.startsWith(item.href + "/")}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <Link href="/settings" className="flex items-center gap-3 hover:bg-accent p-2 rounded-md transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-sm">
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
          <Settings className="h-4 w-4 text-muted-foreground" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
