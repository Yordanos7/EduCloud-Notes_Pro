import { useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import z from "zod";
import gsap from "gsap";
import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function SignInForm({
  onSwitchToSignUp,
}: {
  onSwitchToSignUp: () => void;
}) {
  const navigate = useNavigate();
  const { isPending } = authClient.useSession();
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            toast({
              title: "Welcome back!",
              description: "Successfully logged in to your account.",
            });
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: error.error.message || error.error.statusText,
              variant: "destructive",
            });
          },
        }
      );
    },
    validators: {
      onSubmit: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      }),
    },
  });

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: -30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );

      const inputs = cardRef.current.querySelectorAll(".input-field");
      gsap.fromTo(
        inputs,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, []);

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card ref={cardRef} className="w-full max-w-md shadow-royal-lg border-2">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="font-playfair text-3xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your notes</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.Field name="email">
              {(field) => (
                <div className="input-field space-y-2">
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@example.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    className="transition-smooth"
                  />
                  {field.state.meta.errors.map((error) => (
                    <p
                      key={error?.message}
                      className="text-destructive text-sm"
                    >
                      {error?.message}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <div className="input-field space-y-2">
                  <Label htmlFor={field.name}>Password</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    placeholder="••••••••"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    className="transition-smooth"
                  />
                  {field.state.meta.errors.map((error) => (
                    <p
                      key={error?.message}
                      className="text-destructive text-sm"
                    >
                      {error?.message}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>

            <div className="flex justify-end">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <form.Subscribe>
              {(state) => (
                <Button
                  type="submit"
                  className="w-full shadow-royal-md hover:scale-105 transition-smooth"
                  size="lg"
                  disabled={!state.canSubmit || state.isSubmitting}
                >
                  {state.isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              )}
            </form.Subscribe>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              Don't have an account?{" "}
            </span>
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
