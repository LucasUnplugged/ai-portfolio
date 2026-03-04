export type {
  Person,
  Circle,
  Interaction,
  Reminder,
  Reflection,
  Message,
} from "./types";
export { getLabelColor } from "./types";
import type { Message } from "./types";

export { people, getPersonById } from "./people";
export { circles, getCircleById } from "./circles";
export {
  interactions,
  reminders,
  getInteractionsForPerson,
  getRemindersForToday,
} from "./interactions";
export { reflections, currentReflection } from "./reflections";

export const messages: Message[] = [
  {
    id: "msg-01",
    personId: "cp-01",
    content: "Hey! Are we still on for the hike this Saturday?",
    timestamp: "2026-03-01T10:30:00Z",
    fromMe: false,
  },
  {
    id: "msg-02",
    personId: "cp-01",
    content: "Absolutely! I was thinking Runyon Canyon around 9am?",
    timestamp: "2026-03-01T10:45:00Z",
    fromMe: true,
  },
  {
    id: "msg-03",
    personId: "cp-01",
    content: "Perfect. I'll bring the cold brew this time",
    timestamp: "2026-03-01T11:02:00Z",
    fromMe: false,
  },
  {
    id: "msg-04",
    personId: "cp-01",
    content: "That was such a great hike! The view from the top was incredible",
    timestamp: "2026-03-02T16:20:00Z",
    fromMe: true,
  },
  {
    id: "msg-05",
    personId: "cp-01",
    content: "Right?? I got some amazing photos. Want me to send you the ones of us at the summit?",
    timestamp: "2026-03-02T16:35:00Z",
    fromMe: false,
  },
  {
    id: "msg-06",
    personId: "cp-01",
    content: "Yes please! Also, still down for Joshua Tree in April?",
    timestamp: "2026-03-02T16:40:00Z",
    fromMe: true,
  },
];

export function getMessagesForPerson(personId: string): Message[] {
  return messages.filter((m) => m.personId === personId);
}
