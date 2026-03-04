"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RitualShell } from "@/components/ritual/ritual-shell";
import { ProfileHeader } from "@/components/ritual/profile-header";
import { Button } from "@/components/ui/button";
import { getUserById, activeCircle } from "@/data/ritual";

const viewedUser = getUserById("ru-02")!;

const circleStart = new Date(activeCircle.startDate);
const today = new Date("2026-03-03");
const dayNumber = Math.floor(
  (today.getTime() - circleStart.getTime()) / (1000 * 60 * 60 * 24)
) + 1;

export default function ProfilePage() {
  return (
    <RitualShell current="profile">
      <div className="p-4 space-y-6">
        {/* Back link */}
        <Link
          href="/app/ritual/circle"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        {/* Profile header */}
        <ProfileHeader user={viewedUser} />

        {/* Action buttons */}
        <div className="flex justify-center gap-3">
          <Button asChild size="sm">
            <Link href="/app/ritual/dm">Send Message</Link>
          </Button>
          <Button variant="outline" size="sm">
            Connect
          </Button>
        </div>

        {/* Shared Circle section */}
        <div className="rounded-lg border border-border bg-card p-4 space-y-1">
          <h3 className="text-sm font-medium">Shared Circle</h3>
          <p className="text-sm">{activeCircle.name}</p>
          <p className="text-xs text-muted-foreground">
            Day {dayNumber} of 14
          </p>
        </div>
      </div>
    </RitualShell>
  );
}
