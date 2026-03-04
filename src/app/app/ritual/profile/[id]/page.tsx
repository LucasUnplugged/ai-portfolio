"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { RitualShell } from "@/components/ritual/ritual-shell";
import { ProfileHero } from "@/components/ritual/profile-header";
import { getUserById, matches } from "@/data/ritual";

export default function ViewProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const user = getUserById(id);
  if (!user) return notFound();

  const match = matches.find((m) => m.userId === id);

  return (
    <RitualShell current="profile">
      <ProfileHero user={user} match={match} />
    </RitualShell>
  );
}
