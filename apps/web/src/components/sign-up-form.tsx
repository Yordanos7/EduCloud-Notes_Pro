import { useState, useEffect, useRef } from "react";
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

export default function SignUpForm({
  onSwitchToSignIn,
}: {
  onSwitchToSignIn: () => void;
}) {
  const navigate = useNavigate();
  const { isPending } = authClient.useSession();
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);
  const [confirmPassword, setConfirmPassword] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: async ({ value }) => {
      // Check if passwords match
      if (value.password !== confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }

      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success!",
              description: "Your account has been created. Welcome to CloudCB!",
            });
            setTimeout(() => {
              navigate("/dashboard");
            }, 1500);
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
        name: z.string().min(2, "Name must be at least 2 characters"),
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
          <CardTitle className="font-playfair text-3xl">
            Create Your Account
          </CardTitle>
          <CardDescription>
            Join thousands of users already using CloudCB
          </CardDescription>
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
            <form.Field name="name">
              {(field) => (
                <div className="input-field space-y-2">
                  <Label htmlFor={field.name}>Full Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Yordanos_cb yohannes"
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

            <form.Field name="email">
              {(field) => (
                <div className="input-field space-y-2">
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="yordianos@example.com"
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

            <div className="input-field space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="transition-smooth"
              />
            </div>

            <form.Subscribe>
              {(state) => (
                <Button
                  type="submit"
                  className="w-full shadow-royal-md hover:scale-105 transition-smooth"
                  size="lg"
                  disabled={!state.canSubmit || state.isSubmitting}
                >
                  {state.isSubmitting
                    ? "Creating Account..."
                    : "Create Account"}
                </Button>
              )}
            </form.Subscribe>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
