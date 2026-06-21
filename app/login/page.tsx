"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { API_URL } from "@/lib/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [serverError, setServerError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError("");
    try {
      const res = await fetch(API_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      
      login(data.token, data.user);
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setServerError(err.message);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md p-8 border border-border/50 bg-secondary/10">
        <h1 className="font-heading text-3xl text-center mb-8">Sign In</h1>
        {serverError && <p className="text-red-500 text-sm text-center mb-4">{serverError}</p>}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Email</label>
            <Input 
              {...register("email")} 
              type="email" 
              className={`rounded-none border-border/50 bg-secondary/20 h-12 font-light ${errors.email ? "border-red-500" : ""}`} 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Password</label>
            <Input 
              {...register("password")} 
              type="password" 
              className={`rounded-none border-border/50 bg-secondary/20 h-12 font-light ${errors.password ? "border-red-500" : ""}`} 
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          
          <Button disabled={isSubmitting} type="submit" size="lg" className="w-full rounded-none uppercase tracking-widest font-light h-14">
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        
        <p className="mt-8 text-center text-sm font-light text-muted-foreground">
          Don't have an account? <Link href="/register" className="text-foreground border-b border-foreground pb-1">Register</Link>
        </p>
      </div>
    </div>
  );
}
