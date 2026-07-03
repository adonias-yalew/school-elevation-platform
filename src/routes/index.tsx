import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, CheckCircle2, Users, BookOpen, Calendar, CreditCard, Bell, LineChart,
  Bus, Home, Library, Shield, Sparkles, Star, GraduationCap, ClipboardCheck,
} from "lucide-react";
import heroImg from "@/assets/hero-illustration.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beleh — Modern School Management System" },
      { name: "description", content: "All-in-one school management: attendance, grades, timetables, fees, library, transport, hostel, and messaging — one beautiful platform." },
      { property: "og:title", content: "Beleh — Modern School Management System" },
      { property: "og:description", content: "All-in-one school management for admins, teachers, students, and parents." },
    ],
  }),
  component: Landing,
});

const stats = [
  { value: "10k+", label: "Students managed" },
  { value: "500+", label: "Schools onboarded" },
  { value: "98%", label: "Attendance accuracy" },
  { value: "24/7", label: "Support & uptime" },
];

const features = [
  { icon: Users, title: "Multi-role access", desc: "Purpose-built experiences for admins, teachers, students, and parents." },
  { icon: ClipboardCheck, title: "Attendance & grades", desc: "One-tap attendance, gradebooks, and printable report cards." },
  { icon: Calendar, title: "Timetables & calendar", desc: "Drag-and-drop schedules, term calendars, and event reminders." },
  { icon: CreditCard, title: "Fees & payments", desc: "Invoices, receipts, reminders, and reconciliation in one place." },
  { icon: Bell, title: "Announcements & chat", desc: "Broadcast news, class updates, and one-to-one messaging." },
  { icon: LineChart, title: "Insights & analytics", desc: "Live dashboards for performance, attendance, and finances." },
];

const modules = [
  { icon: Library, title: "Library" },
  { icon: Bus, title: "Transport" },
  { icon: Home, title: "Hostel" },
  { icon: BookOpen, title: "Curriculum" },
  { icon: Shield, title: "Inventory" },
  { icon: GraduationCap, title: "Admissions" },
];

const testimonials = [
  { name: "Selamawit Alemu", role: "Principal, Blue Ridge Academy", quote: "Beleh replaced four disconnected tools. Attendance and fee reporting now take minutes instead of days." },
  { name: "David Okoye", role: "Head of IT, Northgate Schools", quote: "The rollout was painless. Teachers love how fast the gradebook is on their phones." },
  { name: "Mira Patel", role: "Parent", quote: "I finally have one place to see my child's attendance, grades, and school fees. It's a huge relief." },
];

const faqs = [
  { q: "Can Beleh handle multiple campuses?", a: "Yes. Each campus can have its own classes, staff, and reporting while sharing central admin controls and permissions." },
  { q: "How do parents access their child's data?", a: "Parents receive their own login tied to their child's profile — no separate app to install and full mobile support out of the box." },
  { q: "Do you support online fee collection?", a: "Yes. Beleh generates invoices, tracks partial payments, and integrates with popular payment providers for online collection." },
  { q: "Is our data secure?", a: "Every account is protected with role-based access, encrypted at rest, and backed up daily. Only authorized staff can access sensitive records." },
  { q: "Can we export or migrate data?", a: "Absolutely. You can export any dataset to CSV, and we provide onboarding help to import from your existing systems." },
];

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MarketingNav />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-subtle" />
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl -z-10" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in-up">
                <Badge variant="secondary" className="rounded-full px-3 py-1.5 bg-primary-soft text-primary border-0">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Trusted by 500+ schools worldwide
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
                  Run your school with{" "}
                  <span className="text-gradient">clarity and calm</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Beleh brings admissions, attendance, gradebooks, fees, timetables, and messaging into one beautifully simple platform — for admins, teachers, students, and parents.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild size="lg" className="shadow-elegant text-base h-12 px-6">
                    <Link to="/auth">Start free trial <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-base h-12 px-6">
                    <a href="#features">See features</a>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-3 text-sm text-muted-foreground">
                  {["No credit card required", "14-day free trial", "Cancel anytime"].map((t) => (
                    <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" />{t}</span>
                  ))}
                </div>
              </div>
              <div className="relative animate-fade-in">
                <div className="absolute inset-0 bg-gradient-hero rounded-3xl blur-2xl opacity-30 -z-10" />
                <img
                  src={heroImg}
                  alt="Beleh school management dashboard"
                  width={1280}
                  height={960}
                  className="rounded-3xl shadow-elegant border border-border/60 w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-gradient font-display">{s.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
              <Badge variant="secondary" className="bg-primary-soft text-primary border-0">Everything you need</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">One platform for the whole school</h2>
              <p className="text-muted-foreground text-lg">Stop juggling tools. Beleh brings your entire school workflow into a single clean interface.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <Card key={f.title} className="p-6 bg-gradient-card border-border/60 hover-scale shadow-card animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="h-11 w-11 rounded-xl bg-primary-soft grid place-items-center text-primary mb-4">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1.5">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* MODULES */}
        <section id="modules" className="py-20 bg-gradient-subtle border-y border-border/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-12 space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Every module included</h2>
              <p className="text-muted-foreground text-lg">From library to hostel — activate what you need, when you need it.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {modules.map((m) => (
                <div key={m.title} className="p-6 rounded-2xl bg-card border border-border/60 text-center hover-scale transition-smooth">
                  <m.icon className="h-7 w-7 mx-auto text-primary mb-2" />
                  <div className="text-sm font-medium">{m.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
              <Badge variant="secondary" className="bg-primary-soft text-primary border-0">Loved by educators</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What our schools say</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.name} className="p-7 bg-gradient-card border-border/60 shadow-card">
                  <div className="flex gap-0.5 mb-4 text-warning">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6">"{t.quote}"</p>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-muted/30 border-y border-border/60">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently asked questions</h2>
              <p className="text-muted-foreground">Everything you need to know before getting started.</p>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-border/60 rounded-xl px-5 bg-card">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-16 text-center shadow-elegant">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="relative space-y-5 max-w-2xl mx-auto text-primary-foreground">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Ready to run your school better?</h2>
                <p className="text-lg opacity-90">Join hundreds of schools who chose Beleh to modernize their operations.</p>
                <div className="flex flex-wrap gap-3 justify-center pt-2">
                  <Button asChild size="lg" variant="secondary" className="text-base h-12 px-6">
                    <Link to="/auth">Get started free <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-base h-12 px-6 bg-transparent border-white/30 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                    <a href="#features">Explore features</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
