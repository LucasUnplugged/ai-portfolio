export interface Person {
  id: string;
  name: string;
  avatarInitials: string;
  labels: string[];
  circleId: string;
  lastContact: string;
  bio: string;
  interests: string[];
  birthday?: string;
  notes?: string;
}

const LABEL_PALETTE = [
  "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  "bg-purple-500/15 text-purple-700 dark:text-purple-300",
  "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",
  "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  "bg-pink-500/15 text-pink-700 dark:text-pink-300",
];

export function getLabelColor(label: string): string {
  let hash = 0;
  for (let i = 0; i < label.length; i++)
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  return LABEL_PALETTE[Math.abs(hash) % LABEL_PALETTE.length];
}

export interface Circle {
  id: string;
  name: string;
  emoji: string;
  description: string;
  memberIds: string[];
  color: string;
  contactFrequencyDays: number;
}

export interface Interaction {
  id: string;
  personId: string;
  type: "call" | "text" | "meetup" | "note";
  summary: string;
  date: string;
}

export interface Reminder {
  id: string;
  personId: string;
  reason: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
}

export interface Reflection {
  id: string;
  weekOf: string;
  prompt: string;
  response?: string;
  gratitudes: string[];
}
