import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset your password — Beleh" }, { name: "description", content: "Reset your Beleh account password." }] }),
  component: ForgotPassword,
});

const schema = z.object({ email: z.string().trim().email("Enter a valid email").max(255) });

function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { email: "" } });

  const onSubmit = async ({ email }: z.infer<typeof schema>) => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) return toast.error("Couldn't send reset email", { description: error.message });
    setSent(true);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-subtle px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo size="lg" /></div>
        <div className="bg-card border border-border/60 rounded-2xl p-8 shadow-card">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-success/10 text-success grid place-items-center">
                <MailCheck className="h-7 w-7" />
              </div>
              <h1 className="text-2xl font-bold">Check your inbox</h1>
              <p className="text-sm text-muted-foreground">We sent you a link to reset your password. It may take a minute to arrive.</p>
              <Button asChild variant="outline" className="w-full"><Link to="/auth"><ArrowLeft className="h-4 w-4 mr-2" />Back to sign in</Link></Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Forgot password?</h1>
                <p className="text-sm text-muted-foreground mt-1">Enter your email and we'll send you a reset link.</p>
              </div>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@school.edu" {...form.register("email")} />
                  {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
                </div>
                <Button type="submit" className="w-full h-11 shadow-elegant" disabled={loading}>
                  {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Send reset link
                </Button>
                <Button asChild variant="ghost" className="w-full"><Link to="/auth"><ArrowLeft className="h-4 w-4 mr-2" />Back to sign in</Link></Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
