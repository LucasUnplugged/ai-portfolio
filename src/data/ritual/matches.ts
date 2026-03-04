import type { Match } from "./types";

export const matches: Match[] = [
  {
    id: "mt-01",
    userId: "ru-02",
    matchedAt: "2026-03-01T13:00:00Z",
    status: "matched",
    dmThreadId: "dm-01",
  },
  {
    id: "mt-02",
    userId: "ru-06",
    matchedAt: "2026-03-02T15:30:00Z",
    status: "matched",
    dmThreadId: "dm-02",
  },
  {
    id: "mt-03",
    userId: "ru-03",
    matchedAt: "2026-03-03T07:00:00Z",
    status: "pending-sent",
  },
  {
    id: "mt-04",
    userId: "ru-04",
    matchedAt: "2026-03-02T20:00:00Z",
    status: "pending-received",
  },
  {
    id: "mt-05",
    userId: "ru-08",
    matchedAt: "2026-03-03T06:00:00Z",
    status: "pending-received",
  },
];

export function getMatchById(id: string): Match | undefined {
  return matches.find((m) => m.id === id);
}
