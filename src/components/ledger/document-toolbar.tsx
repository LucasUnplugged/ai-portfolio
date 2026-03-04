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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface DocumentToolbarProps {
  className?: string;
}

const toolGroups = [
  [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
    { icon: Strikethrough, label: "Strikethrough" },
  ],
  [
    { icon: Heading1, label: "Heading 1" },
    { icon: Heading2, label: "Heading 2" },
    { icon: Heading3, label: "Heading 3" },
  ],
  [
    { icon: List, label: "Bullet List" },
    { icon: ListOrdered, label: "Ordered List" },
  ],
  [
    { icon: Code, label: "Code" },
    { icon: Link, label: "Link" },
    { icon: Image, label: "Image" },
  ],
];

export function DocumentToolbar({ className }: DocumentToolbarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-0.5 border-b border-border px-4 py-2",
        className
      )}
    >
      {toolGroups.map((group, gi) => (
        <div key={gi} className="flex items-center gap-0.5">
          {gi > 0 && <Separator orientation="vertical" className="mx-1.5 h-5" />}
          {group.map((tool) => {
            const Icon = tool.icon;
            return (
              <Button
                key={tool.label}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                aria-label={tool.label}
              >
                <Icon className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
