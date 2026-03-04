"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MoreHorizontal, MapPin, Briefcase } from "lucide-react";
import type { RitualUser, Match } from "@/data/ritual/types";
import { Button } from "@/components/ui/button";

interface ProfileHeroProps {
  user: RitualUser;
  match?: Match;
  onBack?: string;
}

export function ProfileHero({ user, match, onBack = "/app/ritual/circle" }: ProfileHeroProps) {
  const actionLabel = !match
    ? "Request Match"
    : match.status === "pending-sent"
      ? "Request Sent"
      : match.status === "pending-received"
        ? "Accept Match"
        : "Message";

  const actionHref =
    match?.status === "matched" && match.dmThreadId
      ? "/app/ritual/dm"
      : undefined;

  const isDisabled = match?.status === "pending-sent";

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero image */}
      <div className="relative w-full" style={{ height: "60vh" }}>
        <Image
          src={user.photos[0]}
          alt={user.name}
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        {/* Overlay controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <Link
            href={onBack}
            className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <button className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white backdrop-blur-sm">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h1 className="text-2xl font-heading font-bold text-white">
            {user.name}, {user.age}
          </h1>
        </div>
      </div>

      {/* Info section */}
      <div className="p-4 space-y-4">
        {/* Location & occupation badges */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            <MapPin className="h-3 w-3" />
            {user.location}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            <Briefcase className="h-3 w-3" />
            {user.occupation}
          </span>
        </div>

        {/* Dating prompt cards */}
        <div className="space-y-3">
          {user.datingPrompts.map((prompt, i) => (
            <div key={i} className="rounded-xl bg-card border border-border p-4 space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {prompt.question}
              </p>
              <p className="text-sm leading-relaxed">{prompt.answer}</p>
            </div>
          ))}
        </div>

        {/* Photo preview */}
        {user.photos.length > 1 && (
          <div className="flex items-center gap-3 rounded-xl bg-card border border-border p-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
              <Image
                src={user.photos[1]}
                alt="More photos"
                fill
                className="object-cover"
                sizes="56px"
                unoptimized
              />
            </div>
            <p className="text-xs text-muted-foreground">
              More photos unlock on Day 3
            </p>
          </div>
        )}
      </div>

      {/* Sticky bottom bar */}
      <div className="sticky bottom-0 mt-auto border-t border-border bg-card px-4 py-3 flex items-center justify-between">
        <p className="text-sm font-medium">Interested in {user.name.split(" ")[0]}?</p>
        {actionHref ? (
          <Button size="sm" asChild>
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        ) : (
          <Button size="sm" disabled={isDisabled}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

interface OwnProfileCardProps {
  user: RitualUser;
}

export function OwnProfileCard({ user }: OwnProfileCardProps) {
  return (
    <div className="rounded-xl bg-card border border-border p-6 flex flex-col items-center text-center">
      <div className="relative w-24 h-24 rounded-full overflow-hidden">
        <Image
          src={user.photos[0]}
          alt={user.name}
          fill
          className="object-cover"
          sizes="96px"
          unoptimized
        />
      </div>
      <h2 className="font-heading text-lg mt-3">You, {user.age}</h2>
      <p className="text-sm text-muted-foreground mt-0.5">{user.location}</p>
    </div>
  );
}
