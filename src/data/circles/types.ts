export interface Person {
  id: string;
  name: string;
  avatarInitials: string;
  relationship: string;
  circleId: string;
  lastContact: string;
  bio: string;
  interests: string[];
  birthday?: string;
  notes?: string;
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
