import type { User } from "./types";

export const users: User[] = [
  {
    id: "usr-01",
    name: "Sarah Chen",
    email: "sarah.chen@ledger.io",
    role: "PM",
    avatarInitials: "SC",
    status: "online",
  },
  {
    id: "usr-02",
    name: "Marcus Rivera",
    email: "marcus.rivera@ledger.io",
    role: "Tech Lead",
    avatarInitials: "MR",
    status: "online",
  },
  {
    id: "usr-03",
    name: "Priya Sharma",
    email: "priya.sharma@ledger.io",
    role: "Senior Engineer",
    avatarInitials: "PS",
    status: "away",
  },
  {
    id: "usr-04",
    name: "James Okafor",
    email: "james.okafor@ledger.io",
    role: "Designer",
    avatarInitials: "JO",
    status: "online",
  },
  {
    id: "usr-05",
    name: "Elena Volkov",
    email: "elena.volkov@ledger.io",
    role: "Engineer",
    avatarInitials: "EV",
    status: "offline",
  },
  {
    id: "usr-06",
    name: "David Park",
    email: "david.park@ledger.io",
    role: "QA Lead",
    avatarInitials: "DP",
    status: "online",
  },
];

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}
