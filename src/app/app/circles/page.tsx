import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CirclesOnboarding() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-8 text-center">
      {/* Decorative concentric circles */}
      <div className="relative mb-8">
        <div className="h-24 w-24 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-2 rounded-full border-2 border-primary/30" />
        <div className="absolute inset-4 rounded-full border-2 border-primary/50" />
        <div className="absolute inset-6 rounded-full bg-primary/10" />
      </div>

      <h1 className="text-3xl font-bold tracking-tight">Circles</h1>
      <p className="mt-2 text-base text-primary/80 font-medium">
        Relationship management made easy
      </p>
      <p className="mt-4 text-sm text-muted-foreground max-w-[260px] leading-relaxed">
        Automatic reminders by group. Automatic suggestion by interest. Reflect on the connections
        that shape your life.
      </p>

      <Button asChild className="mt-8 w-full max-w-[200px]">
        <Link href="/app/circles/today">Get Started</Link>
      </Button>
    </div>
  );
}
