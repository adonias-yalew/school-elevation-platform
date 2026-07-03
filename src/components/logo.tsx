import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "h-11 w-11" : size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const text = size === "lg" ? "text-2xl" : "text-lg";
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className={`${dim} grid place-items-center rounded-xl bg-gradient-hero text-primary-foreground shadow-elegant transition-smooth group-hover:scale-105`}>
        <GraduationCap className="h-5 w-5" strokeWidth={2.5} />
      </div>
      <span className={`${text} font-extrabold tracking-tight font-display`}>Beleh</span>
    </Link>
  );
}
