import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/lib/auth-context";

const nav = [
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Button asChild><Link to="/dashboard">Dashboard</Link></Button>
          ) : (
            <>
              <Button asChild variant="ghost"><Link to="/auth">Sign in</Link></Button>
              <Button asChild className="shadow-elegant"><Link to="/auth" search={{ mode: "register" }}>Get started</Link></Button>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" aria-label="Menu" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur px-4 py-4 space-y-3 animate-fade-in">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">{n.label}</a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            {user ? (
              <Button asChild><Link to="/dashboard">Dashboard</Link></Button>
            ) : (
              <>
                <Button asChild variant="outline"><Link to="/auth">Sign in</Link></Button>
                <Button asChild><Link to="/auth">Get started</Link></Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
