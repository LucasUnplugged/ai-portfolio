import type { Circle } from "./types";

export const circles: Circle[] = [
  {
    id: "cir-01",
    name: "Circle",
    description:
      "A group of creative souls who appreciate good conversation, quiet adventures, and finding beauty in the everyday.",
    memberIds: [
      "ru-01",
      "ru-02",
      "ru-03",
      "ru-04",
      "ru-05",
      "ru-06",
      "ru-07",
      "ru-08",
    ],
    startDate: "2026-02-28T00:00:00Z",
    endDate: "2026-03-07T00:00:00Z",
    currentPrompt: {
      id: "pr-05",
      text: "If you could teleport anywhere right now, where would you go?",
      date: "2026-03-04",
      options: [
        { id: "opt-1", emoji: "🏝️", text: "A Tropical Island" },
        { id: "opt-2", emoji: "🏔️", text: "A Cozy Cabin" },
      ],
      responses: [
        { userId: "ru-01", text: "I picked the tropical island! Who's with me? 🏝️", optionId: "opt-1" },
        { userId: "ru-02", text: "Definitely the cabin for me. I need some peace and quiet. 🏕️", optionId: "opt-2" },
        { userId: "ru-07", text: "City life all the way! 🏙️" },
      ],
    },
    pastPrompts: [
      {
        id: "pr-04",
        text: "What's a hobby you picked up recently that surprised you?",
        date: "2026-03-02",
        options: [
          { id: "opt-3", emoji: "🎨", text: "Something Creative" },
          { id: "opt-4", emoji: "🏃", text: "Something Active" },
        ],
        responses: [
          {
            userId: "ru-01",
            text: "I started making sourdough. The starter has a name now. His name is Gerald.",
            optionId: "opt-3",
          },
          {
            userId: "ru-03",
            text: "Birdwatching. I know, I know. But once you spot a painted bunting, you're hooked.",
            optionId: "opt-4",
          },
          {
            userId: "ru-05",
            text: "Pottery! My first bowl looked like a sad hat, but I'm getting better.",
            optionId: "opt-3",
          },
          {
            userId: "ru-07",
            text: "I've been learning to surf. Mostly I learn how to fall gracefully.",
            optionId: "opt-4",
          },
          {
            userId: "ru-08",
            text: "Bookbinding. There's something meditative about stitching pages together.",
            optionId: "opt-3",
          },
        ],
      },
      {
        id: "pr-03",
        text: "Describe your perfect lazy Sunday in three sentences.",
        date: "2026-03-01",
        responses: [
          {
            userId: "ru-02",
            text: "Farmer's market first thing. Repot a plant or two. Fall asleep reading on the couch.",
          },
          {
            userId: "ru-04",
            text: "Sleep in until the guilt wears off. Practice piano with the windows open. Cook something ambitious for dinner.",
          },
          {
            userId: "ru-06",
            text: "Morning walk with zero destination. Chai and a good book in a sunny corner. Call my mom.",
          },
          {
            userId: "ru-01",
            text: "Long trail run to clear my head. Hot shower, cold beer. Sketch whatever building caught my eye that week.",
          },
        ],
      },
      {
        id: "pr-02",
        text: "What's a deal-breaker that most people would find weird?",
        date: "2026-02-28",
        options: [
          { id: "opt-5", emoji: "🍽️", text: "Food Related" },
          { id: "opt-6", emoji: "📚", text: "Lifestyle Related" },
        ],
        responses: [
          {
            userId: "ru-03",
            text: "If you say documentaries are boring, we're fundamentally incompatible. Sorry, I don't make the rules.",
            optionId: "opt-6",
          },
          {
            userId: "ru-07",
            text: "People who put ketchup on eggs. I'm a chef; this is a hill I will die on.",
            optionId: "opt-5",
          },
          {
            userId: "ru-08",
            text: "Dog-earring library books. Buy your own copy if you want to fold corners!",
            optionId: "opt-6",
          },
          {
            userId: "ru-05",
            text: "Not having a single plant in your home. At least a cactus. They're basically immortal.",
            optionId: "opt-6",
          },
        ],
      },
      {
        id: "pr-01",
        text: "Share a song that always puts you in a good mood.",
        date: "2026-02-27",
        responses: [
          {
            userId: "ru-04",
            text: "September by Earth, Wind & Fire. Impossible not to move to that bassline.",
          },
          {
            userId: "ru-01",
            text: "Dog Days Are Over by Florence + The Machine. Pure energy.",
          },
          {
            userId: "ru-06",
            text: "Here Comes the Sun by The Beatles. Classic for a reason.",
          },
        ],
      },
    ],
  },
];

export const activeCircle = circles[0];

export function getCircleById(id: string): Circle | undefined {
  return circles.find((c) => c.id === id);
}
