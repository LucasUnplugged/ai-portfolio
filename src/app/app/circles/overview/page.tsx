"use client";

import { useCallback } from "react";
import { CirclesShell } from "@/components/circles/circles-shell";
import { CircleCard } from "@/components/circles/circle-card";
import {
  circles as initialCircles,
  people as initialPeople,
} from "@/data/circles";
import type { Circle, Person } from "@/data/circles";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Plus } from "lucide-react";

let nextCircleId = 100;

export default function CirclesOverviewPage() {
  const [circlesList, setCirclesList] = useLocalStorage<Circle[]>("circles-circles", initialCircles);
  const [peopleList, setPeopleList] = useLocalStorage<Person[]>("circles-people", initialPeople);

  const movePerson = useCallback(
    (personId: string, targetCircleId: string) => {
      setPeopleList((prev) =>
        prev.map((p) =>
          p.id === personId ? { ...p, circleId: targetCircleId } : p
        )
      );
    },
    [setPeopleList]
  );

  const editCircle = useCallback(
    (circleId: string, updates: Partial<Circle>) => {
      setCirclesList((prev) =>
        prev.map((c) => (c.id === circleId ? { ...c, ...updates } : c))
      );
    },
    [setCirclesList]
  );

  const addCircle = useCallback(() => {
    const id = `cc-new-${nextCircleId++}`;
    setCirclesList((prev) => [
      ...prev,
      {
        id,
        name: "New Circle",
        emoji: "✨",
        description: "Describe this circle...",
        memberIds: [],
        color: "text-purple-600",
        contactFrequencyDays: 14,
      },
    ]);
  }, [setCirclesList]);

  return (
    <CirclesShell current="overview">
      <div className="p-4 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Your Circles</h1>
            <p className="text-sm text-muted-foreground">
              {peopleList.length} people across {circlesList.length} circles
            </p>
          </div>
          <button
            type="button"
            onClick={addCircle}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            New Circle
          </button>
        </div>

        <div className="space-y-4">
          {circlesList.map((circle) => {
            const members = peopleList.filter(
              (p) => p.circleId === circle.id
            );
            return (
              <CircleCard
                key={circle.id}
                circle={circle}
                members={members}
                allCircles={circlesList}
                onMovePerson={movePerson}
                onEditCircle={editCircle}
              />
            );
          })}
        </div>
      </div>
    </CirclesShell>
  );
}
