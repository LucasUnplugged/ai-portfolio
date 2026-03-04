import type { Interaction, Reminder } from "./types";

export const interactions: Interaction[] = [
  {
    id: "ci-01",
    personId: "cp-01",
    type: "meetup",
    summary: "Coffee at Blue Bottle. Talked about her new design system project.",
    date: "2026-03-02",
  },
  {
    id: "ci-02",
    personId: "cp-01",
    type: "text",
    summary: "Sent her that article about design tokens she asked about.",
    date: "2026-02-28",
  },
  {
    id: "ci-03",
    personId: "cp-02",
    type: "meetup",
    summary: "Board game night at his place. Played Wingspan and Ticket to Ride.",
    date: "2026-02-18",
  },
  {
    id: "ci-04",
    personId: "cp-03",
    type: "meetup",
    summary: "Saturday morning run along the waterfront. She PRd her 5k.",
    date: "2026-02-25",
  },
  {
    id: "ci-05",
    personId: "cp-04",
    type: "call",
    summary: "Caught up about his new album dropping. Sounds incredible.",
    date: "2026-03-01",
  },
  {
    id: "ci-06",
    personId: "cp-05",
    type: "text",
    summary: "She sent photos of a weird deep-sea anglerfish. Classic Elena.",
    date: "2026-03-03",
  },
  {
    id: "ci-07",
    personId: "cp-06",
    type: "call",
    summary: "Video call with Dad. He showed me his new bookshelf project.",
    date: "2026-02-28",
  },
  {
    id: "ci-08",
    personId: "cp-07",
    type: "call",
    summary: "Mom called to share her new empanada recipe. Need to visit soon.",
    date: "2026-03-01",
  },
  {
    id: "ci-09",
    personId: "cp-08",
    type: "text",
    summary: "Texted about the family reunion in July. He's in.",
    date: "2026-02-10",
  },
  {
    id: "ci-10",
    personId: "cp-09",
    type: "meetup",
    summary: "Lunch meeting. Discussed team restructuring and my growth path.",
    date: "2026-03-03",
  },
  {
    id: "ci-11",
    personId: "cp-10",
    type: "meetup",
    summary: "Collaborated on user testing for the new onboarding flow.",
    date: "2026-02-27",
  },
  {
    id: "ci-12",
    personId: "cp-11",
    type: "text",
    summary: "She recommended a great Swedish cinnamon bun recipe.",
    date: "2026-02-20",
  },
  {
    id: "ci-13",
    personId: "cp-12",
    type: "meetup",
    summary: "Strategy session over coffee. Sharp insights on retention metrics.",
    date: "2026-03-02",
  },
  {
    id: "ci-14",
    personId: "cp-03",
    type: "note",
    summary: "Priya mentioned she's thinking about moving to Portland.",
    date: "2026-02-20",
  },
  {
    id: "ci-15",
    personId: "cp-04",
    type: "meetup",
    summary: "Vinyl shopping at Amoeba Records. He found a rare Coltrane pressing.",
    date: "2026-02-22",
  },
];

export const reminders: Reminder[] = [
  {
    id: "cr-01",
    personId: "cp-02",
    reason: "Haven't talked in 2 weeks",
    priority: "high",
    dueDate: "2026-03-04",
  },
  {
    id: "cr-02",
    personId: "cp-08",
    reason: "Haven't talked in 3 weeks",
    priority: "high",
    dueDate: "2026-03-04",
  },
  {
    id: "cr-03",
    personId: "cp-11",
    reason: "Haven't talked in 12 days",
    priority: "medium",
    dueDate: "2026-03-04",
  },
  {
    id: "cr-04",
    personId: "cp-03",
    reason: "Birthday coming up on March 22",
    priority: "medium",
    dueDate: "2026-03-15",
  },
  {
    id: "cr-05",
    personId: "cp-06",
    reason: "Check in — it's been a week",
    priority: "low",
    dueDate: "2026-03-07",
  },
  {
    id: "cr-06",
    personId: "cp-10",
    reason: "Follow up on testing results",
    priority: "low",
    dueDate: "2026-03-06",
  },
];

export function getInteractionsForPerson(personId: string): Interaction[] {
  return interactions
    .filter((i) => i.personId === personId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getRemindersForToday(): Reminder[] {
  return reminders
    .filter((r) => new Date(r.dueDate) <= new Date("2026-03-04"))
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
}
