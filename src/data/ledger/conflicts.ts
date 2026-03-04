import type { Conflict } from "./types";

export const conflicts: Conflict[] = [
  {
    id: "conf-01",
    documentId: "doc-03",
    userAId: "usr-03",
    userBId: "usr-02",
    sectionTitle: "Offline Strategy",
    versionA:
      "SQLite for local document cache. Conflict resolution uses last-write-wins for simple fields and operational transform for rich text blocks. OT implementation will use the ot.js library with custom adapters for our block-based document model.",
    versionB:
      "SQLite for local document cache. Conflict resolution uses CRDTs (Conflict-free Replicated Data Types) for all content. This approach eliminates the need for a central server during merges and scales better for real-time collaboration.",
    merged: null,
    status: "unresolved",
    createdAt: "2026-03-03T17:00:00Z",
  },
  {
    id: "conf-02",
    documentId: "doc-01",
    userAId: "usr-04",
    userBId: "usr-05",
    sectionTitle: "Typography",
    versionA:
      'Headings use Bricolage Grotesque for visual weight. Body text uses Manrope for readability at all sizes. Monospace uses JetBrains Mono for code blocks.',
    versionB:
      'Headings use Inter Bold for consistency with our web stack. Body text uses Inter Regular. Monospace uses Fira Code for ligature support in code blocks.',
    merged:
      'Headings use Bricolage Grotesque for visual weight. Body text uses Manrope for readability at all sizes. Monospace uses JetBrains Mono for code blocks. Fira Code is available as an alternative for developers who prefer ligatures.',
    status: "resolved",
    createdAt: "2026-03-01T09:00:00Z",
  },
  {
    id: "conf-03",
    documentId: "doc-02",
    userAId: "usr-02",
    userBId: "usr-03",
    sectionTitle: "Rate Limiting",
    versionA:
      "Free tier: 100 req/min\nPro tier: 1,000 req/min\nEnterprise: 10,000 req/min\nBurst allowance: 2x for 30 seconds",
    versionB:
      "Free tier: 60 req/min\nPro tier: 600 req/min\nEnterprise: 6,000 req/min\nNo burst allowance — steady rate only",
    merged: null,
    status: "unresolved",
    createdAt: "2026-03-03T10:00:00Z",
  },
];

export function getConflictById(id: string): Conflict | undefined {
  return conflicts.find((c) => c.id === id);
}
