import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Compass, Home, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-text-primary dark:text-text-primary-dark flex flex-col items-center justify-center p-4">
      {/* Absolute top right theme toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="max-w-md w-full p-8 text-center space-y-6 shadow-xl border border-black/5 dark:border-white/8">
        <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-primary via-primary-light to-secondary text-accent mx-auto flex items-center justify-center shadow-md">
          <Sparkles className="h-8 w-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block">
            Error 404 • Lost in Space
          </span>
          <h1 className="font-display text-3xl font-bold text-text-primary dark:text-text-primary-dark">
            Page Alignment Not Found
          </h1>
          <p className="text-xs text-text-muted dark:text-text-muted-dark leading-relaxed max-w-xs mx-auto">
            The cosmic path or page you are looking for has shifted orbits or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" size="sm" fullWidth className="gap-1.5 text-xs">
              <Home className="h-4 w-4" /> Landing Page
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="accent" size="sm" fullWidth className="gap-1.5 text-xs font-semibold">
              <Compass className="h-4 w-4" /> Customer Dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
