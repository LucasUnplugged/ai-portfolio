"use client";

import { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code,
  Link,
  Image,
  Heading,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface DocumentToolbarProps {
  className?: string;
}

const inlineGroup = [
  { icon: Bold, label: "Bold" },
  { icon: Italic, label: "Italic" },
  { icon: Underline, label: "Underline" },
  { icon: Strikethrough, label: "Strikethrough" },
];

const headingGroup = [
  { icon: Heading1, label: "Heading 1" },
  { icon: Heading2, label: "Heading 2" },
  { icon: Heading3, label: "Heading 3" },
];

const listGroup = [
  { icon: List, label: "Bullet List" },
  { icon: ListOrdered, label: "Ordered List" },
];

const insertGroup = [
  { icon: Code, label: "Code" },
  { icon: Link, label: "Link" },
  { icon: Image, label: "Image" },
];

function ToolButton({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label={label}>
      <Icon className="h-4 w-4" />
    </Button>
  );
}

function CollapsibleGroup({
  triggerIcon: TriggerIcon,
  triggerLabel,
  items,
}: {
  triggerIcon: React.ComponentType<{ className?: string }>;
  triggerLabel: string;
  items: { icon: React.ComponentType<{ className?: string }>; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        aria-label={triggerLabel}
        onClick={() => setOpen(!open)}
      >
        <TriggerIcon className="h-4 w-4" />
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 z-50 mt-1 flex items-center gap-0.5 rounded-md border border-border bg-background p-1 shadow-md">
            {items.map((tool) => (
              <ToolButton key={tool.label} icon={tool.icon} label={tool.label} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function DocumentToolbar({ className }: DocumentToolbarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-0.5 border-b border-border px-4 py-2",
        className
      )}
    >
      {/* Inline formatting — always visible */}
      <div className="flex items-center gap-0.5">
        {inlineGroup.map((tool) => (
          <ToolButton key={tool.label} icon={tool.icon} label={tool.label} />
        ))}
      </div>

      <Separator orientation="vertical" className="mx-1.5 h-5" />

      {/* Headings — collapsed on mobile */}
      <div className="hidden md:flex items-center gap-0.5">
        {headingGroup.map((tool) => (
          <ToolButton key={tool.label} icon={tool.icon} label={tool.label} />
        ))}
      </div>
      <div className="md:hidden">
        <CollapsibleGroup
          triggerIcon={Heading}
          triggerLabel="Headings"
          items={headingGroup}
        />
      </div>

      <Separator orientation="vertical" className="mx-1.5 h-5" />

      {/* Lists — always visible (only 2 icons) */}
      <div className="flex items-center gap-0.5">
        {listGroup.map((tool) => (
          <ToolButton key={tool.label} icon={tool.icon} label={tool.label} />
        ))}
      </div>

      <Separator orientation="vertical" className="mx-1.5 h-5" />

      {/* Insert — collapsed on mobile */}
      <div className="hidden md:flex items-center gap-0.5">
        {insertGroup.map((tool) => (
          <ToolButton key={tool.label} icon={tool.icon} label={tool.label} />
        ))}
      </div>
      <div className="md:hidden">
        <CollapsibleGroup
          triggerIcon={MoreHorizontal}
          triggerLabel="More tools"
          items={insertGroup}
        />
      </div>
    </div>
  );
}
