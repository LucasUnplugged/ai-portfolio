import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "proj-01",
    name: "Brand Redesign",
    description:
      "Complete visual identity overhaul including logo, color palette, typography system, and component library refresh.",
    status: "active",
    memberIds: ["usr-01", "usr-04", "usr-05"],
    documentCount: 8,
    taskCount: 12,
    lastUpdated: "2026-03-02T14:30:00Z",
    color: "#d97706",
  },
  {
    id: "proj-02",
    name: "API v3 Migration",
    description:
      "Migrate all REST endpoints to v3 with OpenAPI spec, improved auth flow, rate limiting, and backwards-compatible deprecation strategy.",
    status: "active",
    memberIds: ["usr-02", "usr-03", "usr-06"],
    documentCount: 5,
    taskCount: 18,
    lastUpdated: "2026-03-03T09:15:00Z",
    color: "#2563eb",
  },
  {
    id: "proj-03",
    name: "Mobile App Launch",
    description:
      "iOS and Android app for core Ledger features — document viewing, task management, and push notifications.",
    status: "active",
    memberIds: ["usr-01", "usr-02", "usr-03", "usr-04"],
    documentCount: 6,
    taskCount: 22,
    lastUpdated: "2026-03-03T16:45:00Z",
    color: "#059669",
  },
  {
    id: "proj-04",
    name: "Security Audit",
    description:
      "Quarterly security review covering authentication flows, data encryption, dependency vulnerabilities, and compliance checks.",
    status: "active",
    memberIds: ["usr-02", "usr-06"],
    documentCount: 3,
    taskCount: 9,
    lastUpdated: "2026-02-28T11:00:00Z",
    color: "#dc2626",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
