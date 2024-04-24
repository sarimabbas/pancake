import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/auth-js";
import {
  CircleUser,
  FileText,
  Home,
  Layers,
  Menu,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { signOutAction } from "../auth/_actions";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/auth/login");
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen w-full">
      <ResizablePanel
        minSize={15}
        defaultSize={20}
        maxSize={20}
        order={1}
        collapsible
      >
        <div className="hidden bg-muted/40 md:block h-full">
          <div className="flex flex-col h-full max-h-screen gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Pancake"
                  className="h-16 object-scale-down"
                />
                <span className="">Pancake</span>
              </Link>
            </div>
            <div className="flex-1">
              <Navigation />
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel order={2} className="min-h-screen">
        <div className="flex flex-col h-full">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <MobileNavigation />
            <div className="ml-auto">
              <UserButton user={user} />
            </div>
          </header>
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Layout;

function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="w-5 h-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="/dashboard"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Home className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/timeline"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
          >
            <Layers className="w-5 h-5" />
            Timeline
          </Link>
          <Link
            href="/dashboard/resumes"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <FileText className="w-5 h-5" />
            Resumes
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function UserButton({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="w-5 h-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form action={signOutAction}>
          <DropdownMenuItem asChild>
            <button className="w-full">Logout</button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Navigation() {
  return (
    <nav className="flex flex-col gap-1 p-2 text-sm font-medium h-full">
      <NavLink
        href="/dashboard"
        title="Dashboard"
        icon={<Home className="w-4 h-4" />}
      />
      <NavLink
        href="/dashboard/timeline"
        title="Timeline"
        icon={<Layers className="w-4 h-4" />}
      />
      <NavLink
        href="/dashboard/resumes"
        title="Resumes"
        icon={<FileText className="w-4 h-4" />}
      />
      <NavLink
        className="mt-auto"
        href="https://pancake.featurebase.app"
        title="Feedback"
        icon={<MessageCircle className="w-4 h-4" />}
      />
    </nav>
  );
}
