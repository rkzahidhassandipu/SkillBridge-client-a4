"use client";

import * as React from "react";
import { usePathname } from "next/navigation"; // ১. নতুন ইমপোর্ট
import { IconDashboard } from "@tabler/icons-react"; // প্রয়োজন অনুযায়ী আইকনগুলো ইমপোর্ট করুন

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { RouteItem } from "@/types";
import { ROLES } from "@/constants/roles";
import adminRoutes from "@/app/router/adminRouters";
import studentRoutes from "@/app/router/studentRouters";
import tutorRoutes from "@/app/router/tutorRouters";
import { cn } from "@/lib/utils"; // ইউটিলিটি ফাংশন (যদি থাকে)

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  const pathname = usePathname(); // ২. বর্তমান পাথ ধরার জন্য
  let routes: RouteItem[] = [];

  switch (user.role) {
    case ROLES.ADMIN:
      routes = adminRoutes;
      break;
    case ROLES.USER:
      routes = studentRoutes;
      break;
    case ROLES.TUTOR:
      routes = tutorRoutes;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props} className="border-r border-gray-200 bg-white">
      <SidebarHeader className="border-b border-gray-100 p-4">
        <div className="flex items-center gap-2 font-bold text-lg text-primary">
          <IconDashboard size={24} />
          <span>EduPortal</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {routes.map((item) => {
              // ৩. চেক করা হচ্ছে এই আইটেমটি বা তার সাব-আইটেম Active কি না
              const isActive = pathname === item.url || item.items?.some(sub => pathname === sub.url);

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    // ৪. Active স্টাইলিং (Eye-catching yet simple)
                    className={cn(
                      "transition-all duration-200 ease-in-out",
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                    )}
                  >
                    <Link href={item.url || "#"}>
                      {item.icon && <item.icon className="size-4" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>

                  {item.items?.length ? (
                    <SidebarMenuSub className="ml-4 border-l border-gray-200">
                      {item.items.map((sub) => {
                        const isSubActive = pathname === sub.url;
                        return (
                          <SidebarMenuSubItem key={sub.title}>
                            <SidebarMenuSubButton
                              asChild
                              className={cn(
                                "transition-all duration-200",
                                isSubActive
                                  ? "text-primary font-semibold"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              <Link href={sub.url}>
                                <span>{sub.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}