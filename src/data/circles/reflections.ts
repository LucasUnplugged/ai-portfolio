import type { Reflection } from "./types";

export const reflections: Reflection[] = [
  {
    id: "crf-01",
    weekOf: "2026-02-17",
    prompt: "Who made you smile this week? How can you let them know?",
    response:
      "Maya surprised me with concert tickets. I should write her a proper thank-you note instead of just texting.",
    gratitudes: [
      "Maya's spontaneous generosity",
      "Saturday runs with Priya — keeps me grounded",
      "Dad's patience when teaching me woodworking over video",
    ],
  },
  {
    id: "crf-02",
    weekOf: "2026-02-24",
    prompt:
      "Think of someone you haven't reached out to in a while. What's one small step you could take?",
    response:
      "Realized I haven't talked to Mateo in almost a month. Sent him a text about the family reunion — he was really glad to hear from me.",
    gratitudes: [
      "Jordan hosting game night, even when he's exhausted from work",
      "Mom's empanadas — comfort food across any distance",
      "Aisha's mentorship at work",
    ],
  },
  {
    id: "crf-03",
    weekOf: "2026-03-03",
    prompt:
      "What relationship are you most grateful for right now? What makes it special?",
    response:
      "Elena, honestly. Even across the distance, she sends me weird ocean photos that always make my day. Our sibling shorthand never fades.",
    gratitudes: [
      "Elena's deep-sea anglerfish photos",
      "Sam introducing me to a new artist every week",
      "Kai bringing me tea during that long testing session",
    ],
  },
  {
    id: "crf-04",
    weekOf: "2026-03-04",
    prompt:
      "Is there a conversation you've been putting off? What would it feel like to have it?",
    gratitudes: [],
  },
];

export const currentReflection = reflections[reflections.length - 1];
