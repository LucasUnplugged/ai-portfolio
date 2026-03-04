export interface RitualUser {
  id: string;
  name: string;
  age: number;
  avatarInitials: string;
  bio: string;
  interests: string[];
  location: string;
  joinedAt: string;
  status: "online" | "offline" | "away";
}

export interface DailyPrompt {
  id: string;
  text: string;
  date: string;
  responses: PromptResponse[];
}

export interface PromptResponse {
  userId: string;
  text: string;
}

export interface Circle {
  id: string;
  name: string;
  description: string;
  memberIds: string[];
  startDate: string;
  endDate: string;
  currentPrompt: DailyPrompt;
  pastPrompts: DailyPrompt[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  type: "text" | "prompt-response";
  promptId?: string;
}

export interface DMThread {
  id: string;
  participantIds: [string, string];
  messages: ChatMessage[];
}

export interface Match {
  id: string;
  userId: string;
  matchedAt: string;
  status: "matched" | "pending-sent" | "pending-received";
  dmThreadId?: string;
}
