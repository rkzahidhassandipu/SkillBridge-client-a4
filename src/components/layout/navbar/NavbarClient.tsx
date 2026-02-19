"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ModeToggle/ModeToggle";
import { AvatarMenu } from "@/components/module/Avatar/Avatar";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavbarClientProps {
  className?: string;
  session: { user?: { name?: string; image?: string } } | null;
}

const routes = [
  { title: "Home", href: "/" },
  { title: "Course", href: "/course" },
];

export function NavbarClient({ className, session }: NavbarClientProps) {
  return (
    <section
      className={cn(
        "fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-border z-50 py-4",
        className
      )}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://i.ibb.co/YBMTTLhq/t-1.png"
              width={32}
              height={32}
              alt="Logo"
              className="object-contain"
            />
            <span className="font-bold text-lg">TutorHub</span>
          </Link>

          {/* Desktop Menu */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList className="flex gap-4">
              {routes.map((route) => (
                <NavigationMenuItem key={route.title}>
                  <NavigationMenuLink
                    href={route.href}
                    className="px-3 py-2 rounded-md font-medium hover:bg-muted/50 transition-colors"
                  >
                    {route.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ModeToggle />
            {session?.user ? (
              <AvatarMenu image={session.user.image} />
            ) : (
              <>
                <Button variant="outline">
                  <Link href="/register">Register</Link>
                </Button>
                <Button>
                  <Link href="/login">Login</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="https://i.ibb.co/YBMTTLhq/t-1.png"
                      width={32}
                      height={32}
                      alt="Logo"
                      className="object-contain"
                    />
                    <span className="text-lg font-semibold tracking-tighter">TutorHub</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Routes */}
              <div className="flex flex-col mt-4 gap-2 px-4">
                {routes.map((route) => (
                  <Link
                    key={route.title}
                    href={route.href}
                    className="px-4 py-2 rounded-md font-medium hover:bg-muted/50 transition-colors"
                  >
                    {route.title}
                  </Link>
                ))}

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <ModeToggle />
                  {session?.user ? (
                    <AvatarMenu image={session.user.image} />
                  ) : (
                    <>
                      <Button variant="outline">
                        <Link href="/register">Register</Link>
                      </Button>
                      <Button>
                        <Link href="/login">Login</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
}
