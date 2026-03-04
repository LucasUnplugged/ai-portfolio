import type { Circle } from "./types";

export const circles: Circle[] = [
  {
    id: "cc-01",
    name: "Close Friends",
    emoji: "\u{1F49B}",
    description: "The people who know you best. Prioritize regular quality time.",
    memberIds: ["cp-01", "cp-02", "cp-03", "cp-04"],
    color: "text-yellow-600",
  },
  {
    id: "cc-02",
    name: "Family",
    emoji: "\u{1F3E0}",
    description: "Your family circle. Stay connected even when life gets busy.",
    memberIds: ["cp-05", "cp-06", "cp-07", "cp-08"],
    color: "text-rose-600",
  },
  {
    id: "cc-03",
    name: "Colleagues",
    emoji: "\u{1F4BC}",
    description: "Professional relationships that matter beyond work.",
    memberIds: ["cp-09", "cp-10", "cp-11", "cp-12"],
    color: "text-blue-600",
  },
];

export function getCircleById(id: string): Circle | undefined {
  return circles.find((c) => c.id === id);
}
