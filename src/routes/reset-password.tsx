import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Set new password — Beleh" }, { name: "robots", content: "noindex" }] }),
  component: ResetPassword,
});

const schema = z.object({
  password: z.string().min(6, "At least 6 characters").max(72),
  confirm: z.string(),
}).refine((v) => v.password === v.confirm, { message: "Passwords do not match", path: ["confirm"] });

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { password: "", confirm: "" } });

  const onSubmit = async ({ password }: z.infer<typeof schema>) => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error("Couldn't update password", { description: error.message });
    toast.success("Password updated");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-subtle px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo size="lg" /></div>
        <div className="bg-card border border-border/60 rounded-2xl p-8 shadow-card">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Set a new password</h1>
            <p className="text-sm text-muted-foreground mt-1">Choose a strong password you'll remember.</p>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="password">New password</Label>
              <Input id="password" type="password" {...form.register("password")} />
              {form.formState.errors.password && <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input id="confirm" type="password" {...form.register("confirm")} />
              {form.formState.errors.confirm && <p className="text-xs text-destructive">{form.formState.errors.confirm.message}</p>}
            </div>
            <Button type="submit" className="w-full h-11 shadow-elegant" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Update password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
