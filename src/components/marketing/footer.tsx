import { Logo } from "@/components/logo";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              A complete school management platform built for modern institutions.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Modules", "Pricing", "Roadmap"] },
            { title: "Company", links: ["About", "Careers", "Contact", "Partners"] },
            { title: "Resources", links: ["Docs", "Blog", "Help center", "Status"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col sm:flex-row justify-between gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Beleh School Management. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-smooth">Privacy</a>
            <a href="#" className="hover:text-foreground transition-smooth">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
