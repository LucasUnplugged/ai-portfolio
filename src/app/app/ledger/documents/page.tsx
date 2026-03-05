import Link from "next/link";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  projects,
  getDocumentsByProject,
  getUserById,
} from "@/data/ledger";

const docStatusVariant: Record<string, "default" | "secondary" | "outline"> = {
  published: "default",
  draft: "outline",
  archived: "secondary",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

export default function DocumentsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-heading font-semibold tracking-tight">
          Documents
        </h1>
      </div>

      {/* Documents grouped by project */}
      {projects.map((project) => {
        const docs = getDocumentsByProject(project.id);
        if (docs.length === 0) return null;

        return (
          <section key={project.id} className="space-y-1">
            <div className="flex items-center gap-2 px-1 mb-2">
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: project.color }}
              />
              <h2 className="text-sm font-medium text-muted-foreground">
                {project.name}
              </h2>
            </div>

            <div className="space-y-1">
              {docs.map((doc) => {
                const editor = getUserById(doc.lastEditedBy);
                return (
                  <Link
                    key={doc.id}
                    href={`/app/ledger/documents/${doc.id}`}
                    className="flex items-center justify-between gap-4 rounded-lg px-4 py-3 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {doc.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge
                        variant={docStatusVariant[doc.status] ?? "outline"}
                        className="text-[11px]"
                      >
                        {doc.status}
                      </Badge>
                      {editor && (
                        <span className="text-xs text-muted-foreground hidden sm:inline">
                          {editor.name}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground w-16 text-right">
                        {timeAgo(doc.lastEditedAt)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
