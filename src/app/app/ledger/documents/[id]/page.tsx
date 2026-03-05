"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { DocumentToolbar } from "@/components/ledger/document-toolbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getDocumentById, getUserById } from "@/data/ledger";
import { notFound } from "next/navigation";

// Mock collaborators
const collaborators = [
  { userId: "usr-01", activity: "Editing", color: "bg-emerald-500" },
  { userId: "usr-02", activity: "Viewing", color: "bg-amber-400" },
  { userId: "usr-03", activity: "Viewing", color: "bg-amber-400" },
];

// Mock version history
const versions = [
  { version: 3, timeAgo: "2h ago", author: "Sarah Chen" },
  { version: 2, timeAgo: "1d ago", author: "Marcus Rivera" },
  { version: 1, timeAgo: "3d ago", author: "Priya Sharma" },
];

function ContentBlock({ block }: { block: { type: string; content: string } }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="text-xl font-heading font-semibold mt-8 mb-3 first:mt-0">
          {block.content}
        </h2>
      );
    case "paragraph":
      return (
        <p className="text-sm leading-relaxed text-foreground/90 mb-4">
          {block.content}
        </p>
      );
    case "list":
      return (
        <ul className="list-disc list-inside space-y-1 mb-4 text-sm text-foreground/90">
          {block.content.split("\n").map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="rounded-lg bg-muted p-4 mb-4 overflow-x-auto">
          <code className="text-xs font-mono text-foreground/80">
            {block.content}
          </code>
        </pre>
      );
    default:
      return <p className="text-sm mb-4">{block.content}</p>;
  }
}

function DetailsSidebar() {
  return (
    <div className="p-4 space-y-6">
      {/* Collaborators */}
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
          Collaborators
        </h3>
        <div className="space-y-3">
          {collaborators.map((collab) => {
            const user = getUserById(collab.userId);
            if (!user) return null;
            return (
              <div key={collab.userId} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-[10px]">
                      {user.avatarInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background ${collab.color}`}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {collab.activity}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Version History */}
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
          Version History
        </h3>
        <div className="space-y-2">
          {versions.map((v) => (
            <div key={v.version} className="rounded-md bg-muted/50 px-3 py-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">v{v.version}</span>
                <span className="text-xs text-muted-foreground">
                  {v.timeAgo}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">{v.author}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DocumentEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const doc = getDocumentById(id);
  const [detailsOpen, setDetailsOpen] = useState(false);

  if (!doc) return notFound();

  const editor = getUserById(doc.lastEditedBy);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 md:px-6 py-3">
        <Link
          href="/app/ledger/documents"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Documents
        </Link>
        <Separator orientation="vertical" className="h-4" />
        <span className="text-sm text-muted-foreground">
          {doc.status === "draft" ? "Draft" : "Published"}
        </span>

        {/* Mobile details button */}
        <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="ml-auto flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors md:hidden"
            >
              <span>Details</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="ledger-theme w-72 p-0">
            <SheetTitle className="sr-only">Document Details</SheetTitle>
            <ScrollArea className="h-full">
              <DetailsSidebar />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Toolbar */}
      <DocumentToolbar />

      {/* Content + Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <ScrollArea className="flex-1">
          <div className="mx-auto max-w-3xl px-6 md:px-12 py-8">
            {/* Document title */}
            <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-6 pb-2 border-b border-transparent hover:border-border transition-colors cursor-text">
              {doc.title}
            </h1>

            {/* Byline */}
            <div className="flex items-center gap-2 mb-8 text-xs text-muted-foreground">
              <span>
                Last edited by {editor?.name ?? "Unknown"} &middot;{" "}
                {new Date(doc.lastEditedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Content blocks */}
            {doc.contentBlocks.slice(1).map((block, i) => (
              <div key={`${block.type}-${i}`} className="relative">
                <ContentBlock block={block} />
                {/* Mock cursor between blocks 2 and 3 */}
                {i === 2 && (
                  <div
                    className="group absolute -left-8 top-0 hidden md:flex items-center gap-2"
                    aria-hidden="true"
                  >
                    <div className="h-6 w-0.5 animate-pulse rounded-full bg-blue-500" />
                    <span className="whitespace-nowrap rounded bg-blue-500 px-1.5 py-0.5 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      Marcus
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Right sidebar — desktop only */}
        <div className="hidden md:block w-72 shrink-0 border-l border-border">
          <ScrollArea className="h-full">
            <DetailsSidebar />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
