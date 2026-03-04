"use client";

import { activeCircle, getUserById } from "@/data/ritual";
import { RitualShell } from "@/components/ritual/ritual-shell";
import { CircleMember } from "@/components/ritual/circle-member";
import { PromptCard } from "@/components/ritual/prompt-card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const members = activeCircle.memberIds
  .map((id) => getUserById(id))
  .filter(Boolean) as NonNullable<ReturnType<typeof getUserById>>[];

const now = new Date();
const end = new Date(activeCircle.endDate);
const start = new Date(activeCircle.startDate);
const totalDays = Math.ceil(
  (end.getTime() - start.getTime()) / 86_400_000
);
const elapsed = Math.ceil(
  (now.getTime() - start.getTime()) / 86_400_000
);
const dayNumber = Math.max(1, Math.min(elapsed, totalDays));
const daysRemaining = Math.max(0, totalDays - elapsed);
const progress = Math.min(100, Math.round((dayNumber / totalDays) * 100));

export default function CirclePage() {
  return (
    <RitualShell current="circle">
      <div className="p-4 space-y-6">
        {/* Circle header */}
        <div>
          <h1 className="text-xl font-heading font-bold tracking-tight">
            {activeCircle.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {activeCircle.description}
          </p>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Day {dayNumber} of {totalDays}
              </span>
              <span className="text-primary font-medium">
                {daysRemaining} day{daysRemaining !== 1 ? "s" : ""} remaining
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Daily Prompt */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Today&apos;s Prompt
          </h2>
          <PromptCard prompt={activeCircle.currentPrompt} />
          <Button variant="outline" className="w-full gap-2">
            <MessageCircle className="h-4 w-4" />
            Share your response
          </Button>
        </div>

        {/* Members grid */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Your Circle
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {members.map((user) => (
              <CircleMember key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </RitualShell>
  );
}
