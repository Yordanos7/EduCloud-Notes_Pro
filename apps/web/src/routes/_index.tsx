import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cloud, Users, FileDown, Lock, Zap, Globe } from "lucide-react";
import gsap from "gsap";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll(".animate-element");
      gsap.fromTo(
        elements,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }

    // Feature cards animation
    if (featuresRef.current) {
      const cards = featuresRef.current.querySelectorAll(".feature-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.4,
        }
      );
    }
  }, []);

  const features = [
    {
      icon: Cloud,
      title: "Cloud Storage",
      description:
        "Access your notes from anywhere, anytime. Your data is securely stored in the cloud.",
    },
    {
      icon: Users,
      title: "Real-Time Collaboration",
      description:
        "Share notes with classmates and collaborate in real-time for group projects.",
    },
    {
      icon: FileDown,
      title: "PDF Export",
      description:
        "Export your notes to PDF format for offline studying and printing.",
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description:
        "Your notes are encrypted and protected with industry-standard security.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant sync across devices with blazing-fast performance.",
    },
    {
      icon: Globe,
      title: "Access Anywhere",
      description:
        "Desktop, tablet, or mobile - your notes adapt to any screen size.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>

        <div
          className="container mx-auto px-4 py-20 md:py-32 relative z-10"
          ref={heroRef}
        >
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <h1 className="animate-element font-playfair text-5xl md:text-7xl font-bold mb-6">
              EduCloud Notes
            </h1>
            <h2 className="animate-element text-2xl md:text-3xl font-inter font-light mb-8">
              Your Notes, Anytime, Anywhere
            </h2>
            <p className="animate-element text-lg md:text-xl mb-12 text-white/90">
              Organize, Share, and Collaborate Effortlessly
            </p>

            <div className="animate-element flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 shadow-royal-lg hover:scale-105 transition-smooth"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login?signin=true">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-white/10 border-white/30 hover:bg-white/20 text-white"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed specifically for students who want to
            stay organized and collaborate effectively.
          </p>
        </div>

        <div
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              className="feature-card p-8 hover-lift shadow-royal-md border-2 border-border/50 bg-card"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-royal-sm">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-playfair text-2xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Join thousands of students already using EduCloud Notes to ace their
            studies.
          </p>
          <Link to="/login">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-10 py-6 shadow-royal-lg hover:scale-105 transition-smooth"
            >
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
                EduCloud Notes
              </h3>
              <p className="text-muted-foreground">
                Your notes, beautifully organized.
              </p>
            </div>
            <div className="flex gap-6">
              <Link
                to="/about"
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                About
              </Link>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                Terms
              </a>
            </div>
          </div>
          <div className="text-center mt-8 text-muted-foreground text-sm">
            © 2025 EduCloud Notes. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
