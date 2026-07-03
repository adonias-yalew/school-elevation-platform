import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users, GraduationCap, CreditCard, ClipboardCheck, TrendingUp, TrendingDown,
  Plus, UserPlus, FileText, Megaphone, ArrowRight, MoreHorizontal,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell,
} from "recharts";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Beleh" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

const kpis = [
  { label: "Total students", value: "1,284", delta: "+4.2%", trend: "up" as const, icon: Users, tint: "bg-info/10 text-info" },
  { label: "Teachers", value: "86", delta: "+2", trend: "up" as const, icon: GraduationCap, tint: "bg-primary-soft text-primary" },
  { label: "Fees collected", value: "$142,380", delta: "+12.4%", trend: "up" as const, icon: CreditCard, tint: "bg-success/10 text-success" },
  { label: "Attendance today", value: "94.6%", delta: "-1.1%", trend: "down" as const, icon: ClipboardCheck, tint: "bg-warning/15 text-warning" },
];

const enrollmentData = [
  { m: "Jan", s: 1080 }, { m: "Feb", s: 1120 }, { m: "Mar", s: 1155 },
  { m: "Apr", s: 1190 }, { m: "May", s: 1210 }, { m: "Jun", s: 1245 },
  { m: "Jul", s: 1268 }, { m: "Aug", s: 1284 },
];
const attendanceData = [
  { d: "Mon", a: 96 }, { d: "Tue", a: 94 }, { d: "Wed", a: 92 },
  { d: "Thu", a: 95 }, { d: "Fri", a: 89 }, { d: "Sat", a: 78 },
];

const activities = [
  { name: "Selam Bekele", action: "submitted Math assignment", time: "2m ago", type: "assignment" },
  { name: "Mr. Daniel", action: "posted new announcement to Grade 10", time: "18m ago", type: "announcement" },
  { name: "Hana Yohannes", action: "paid $250 tuition", time: "1h ago", type: "payment" },
  { name: "Kalkidan T.", action: "marked absent from Physics", time: "2h ago", type: "attendance" },
  { name: "Ms. Rahel", action: "updated Grade 8 timetable", time: "4h ago", type: "timetable" },
];

const upcoming = [
  { title: "Parent–teacher meeting", date: "Tomorrow, 9:00 AM", tag: "Grade 6–8" },
  { title: "Mid-term exams begin", date: "Mon, Jul 6", tag: "All grades" },
  { title: "Sports day", date: "Fri, Jul 10", tag: "Whole school" },
];

const quickActions = [
  { icon: UserPlus, label: "Add student" },
  { icon: GraduationCap, label: "Add teacher" },
  { icon: FileText, label: "Create invoice" },
  { icon: Megaphone, label: "New announcement" },
];

function Dashboard() {
  const { user } = useAuth();
  const name = (user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "there") as string;
  const greeting = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 items-start sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight truncate">{greeting}, {name} 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">Here's what's happening at your school today.</p>
        </div>
        <Button className="shadow-elegant shrink-0"><Plus className="h-4 w-4 mr-1.5" />New</Button>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className="p-5 bg-gradient-card border-border/60 shadow-card hover-scale">
            <div className="flex items-start justify-between">
              <div className={`h-10 w-10 rounded-xl grid place-items-center ${k.tint}`}>
                <k.icon className="h-5 w-5" />
              </div>
              <Badge variant="secondary" className={`gap-1 ${k.trend === "up" ? "text-success" : "text-destructive"} bg-transparent`}>
                {k.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {k.delta}
              </Badge>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold tracking-tight">{k.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{k.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-6 shadow-card">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="font-semibold">Enrollment growth</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Total active students this year</p>
            </div>
            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={enrollmentData}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="s" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#grad1)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 shadow-card">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="font-semibold">Weekly attendance</h3>
              <p className="text-xs text-muted-foreground mt-0.5">% present by day</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} domain={[60, 100]} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} cursor={{ fill: "var(--color-muted)" }} />
              <Bar dataKey="a" radius={[8, 8, 0, 0]}>
                {attendanceData.map((d, i) => (
                  <Cell key={i} fill={d.a >= 90 ? "var(--color-primary)" : d.a >= 80 ? "var(--color-warning)" : "var(--color-destructive)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick actions + activity + upcoming */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 shadow-card">
          <h3 className="font-semibold mb-1">Quick actions</h3>
          <p className="text-xs text-muted-foreground mb-4">Common tasks in one tap</p>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <button key={a.label} className="group flex flex-col items-start gap-2 rounded-xl border border-border/60 p-4 text-left transition-smooth hover:border-primary/40 hover:bg-primary-soft/40">
                <div className="h-9 w-9 rounded-lg bg-primary-soft text-primary grid place-items-center group-hover:scale-105 transition-smooth">
                  <a.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{a.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t">
            <div className="flex items-center justify-between mb-2 text-sm"><span className="font-medium">Fee collection</span><span className="text-muted-foreground">78%</span></div>
            <Progress value={78} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">$142,380 of $182,500 target this term</p>
          </div>
        </Card>

        <Card className="p-6 shadow-card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Recent activity</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Latest events across your school</p>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">View all <ArrowRight className="h-3 w-3 ml-1" /></Button>
          </div>
          <ul className="space-y-3">
            {activities.map((a, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/60 transition-smooth">
                <Avatar className="h-9 w-9 shrink-0"><AvatarFallback className="bg-primary-soft text-primary text-xs font-semibold">{a.name.split(" ").map(n => n[0]).slice(0,2).join("")}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm truncate"><span className="font-medium">{a.name}</span> <span className="text-muted-foreground">{a.action}</span></p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Upcoming events */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">Upcoming events</h3>
            <p className="text-xs text-muted-foreground mt-0.5">What's on the calendar</p>
          </div>
          <Button variant="outline" size="sm">Open calendar</Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {upcoming.map((e) => (
            <div key={e.title} className="p-4 rounded-xl border border-border/60 bg-gradient-card hover-scale transition-smooth">
              <Badge variant="secondary" className="mb-2 bg-primary-soft text-primary border-0">{e.tag}</Badge>
              <div className="font-medium text-sm">{e.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{e.date}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
