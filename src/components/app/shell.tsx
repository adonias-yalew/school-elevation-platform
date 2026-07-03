import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Calendar, ClipboardCheck,
  BarChart3, CreditCard, Bus, Home, Library, Package, Megaphone, MessageSquare,
  Settings, LogOut, Search, Bell, Menu, X, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Overview",
    items: [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Academics",
    items: [
      { to: "/dashboard", label: "Students", icon: Users },
      { to: "/dashboard", label: "Teachers", icon: GraduationCap },
      { to: "/dashboard", label: "Classes", icon: BookOpen },
      { to: "/dashboard", label: "Timetable", icon: Calendar },
      { to: "/dashboard", label: "Attendance", icon: ClipboardCheck },
      { to: "/dashboard", label: "Grades", icon: BarChart3 },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/dashboard", label: "Fees", icon: CreditCard },
      { to: "/dashboard", label: "Library", icon: Library },
      { to: "/dashboard", label: "Transport", icon: Bus },
      { to: "/dashboard", label: "Hostel", icon: Home },
      { to: "/dashboard", label: "Inventory", icon: Package },
    ],
  },
  {
    label: "Communication",
    items: [
      { to: "/dashboard", label: "Announcements", icon: Megaphone },
      { to: "/dashboard", label: "Messages", icon: MessageSquare },
    ],
  },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, roles, signOut } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const initials = (user?.user_metadata?.full_name ?? user?.email ?? "U").slice(0, 2).toUpperCase();
  const displayName = user?.user_metadata?.full_name ?? user?.email;
  const primaryRole = roles[0] ?? "student";

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-foreground/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
      )}>
        <div className="h-16 flex items-center justify-between px-5 border-b border-sidebar-border shrink-0">
          <Logo />
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{group.label}</div>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = item.to === "/dashboard" && pathname === "/dashboard" && item.label === "Dashboard";
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-smooth",
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border shrink-0">
          <Link to="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/60">
            <Settings className="h-4 w-4" /><span>Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 h-16 bg-background/85 backdrop-blur border-b border-border flex items-center gap-3 px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden shrink-0" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative flex-1 max-w-md">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input placeholder="Search students, classes, invoices…" className="pl-9 h-10 bg-muted/40 border-transparent focus-visible:bg-background" />
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-[1.15rem] w-[1.15rem]" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 pl-1.5 pr-2 gap-2">
                  <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary-soft text-primary text-xs font-semibold">{initials}</AvatarFallback></Avatar>
                  <div className="hidden sm:flex flex-col items-start leading-tight">
                    <span className="text-xs font-semibold truncate max-w-[120px]">{displayName}</span>
                    <Badge variant="secondary" className="h-4 px-1.5 text-[10px] capitalize">{primaryRole}</Badge>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="text-sm">{displayName}</span>
                  <span className="text-xs text-muted-foreground font-normal">{user?.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
