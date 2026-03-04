"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CirclesShell } from "@/components/circles/circles-shell";
import { InteractionItem } from "@/components/circles/interaction-item";
import { people, getInteractionsForPerson, getCircleById, getLabelColor } from "@/data/circles";

const person = people[0]; // Maya Chen
const personInteractions = getInteractionsForPerson(person.id);
const circle = getCircleById(person.circleId);

export default function PersonProfilePage() {
  return (
    <CirclesShell current="overview">
      <div className="p-4 space-y-5">
        {/* Back link */}
        <Link
          href="/app/circles/overview"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>

        {/* Profile header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
            {person.avatarInitials}
          </div>
          <div>
            <h1 className="text-lg font-semibold">{person.name}</h1>
            <div className="flex flex-wrap justify-center gap-1.5 mt-1">
              {person.labels.map((label) => (
                <span
                  key={label}
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getLabelColor(label)}`}
                >
                  {label}
                </span>
              ))}
              {circle && (
                <span className="text-xs text-muted-foreground">
                  · {circle.name}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-foreground/80 leading-relaxed">
          {person.bio}
        </p>

        {/* Interests */}
        <div className="flex flex-wrap gap-1.5">
          {person.interests.map((interest) => (
            <Badge key={interest} variant="secondary" className="text-xs">
              {interest}
            </Badge>
          ))}
        </div>

        {/* Interaction history */}
        <div className="space-y-2">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Interaction History
          </h2>
          {personInteractions.length > 0 ? (
            <div>
              {personInteractions.map((interaction) => (
                <InteractionItem
                  key={interaction.id}
                  interaction={interaction}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No interactions logged yet.
            </p>
          )}
        </div>
      </div>
    </CirclesShell>
  );
}
