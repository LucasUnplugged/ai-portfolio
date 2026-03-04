"use client";

import { CirclesShell } from "@/components/circles/circles-shell";
import { CircleCard } from "@/components/circles/circle-card";
import { PersonCard } from "@/components/circles/person-card";
import { circles, people } from "@/data/circles";

const circleData = circles.map((circle) => ({
  circle,
  members: people.filter((p) => p.circleId === circle.id),
}));

export default function CirclesOverviewPage() {
  return (
    <CirclesShell current="overview">
      <div className="p-4 space-y-5">
        <div>
          <h1 className="text-xl font-semibold">Your Circles</h1>
          <p className="text-sm text-muted-foreground">
            {people.length} people across {circles.length} circles
          </p>
        </div>

        <div className="space-y-4">
          {circleData.map(({ circle, members }) => (
            <div key={circle.id} className="space-y-1">
              <CircleCard circle={circle} members={members} />
              <div className="pl-1">
                {members.map((member) => (
                  <PersonCard key={member.id} person={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CirclesShell>
  );
}
