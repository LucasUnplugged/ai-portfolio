"use client";

import { useState } from "react";
import type { Circle, Person } from "@/data/circles";
import { Pencil, ArrowRightLeft, Plus, Check, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CircleCardProps {
  circle: Circle;
  members: Person[];
  allCircles: Circle[];
  onMovePerson?: (personId: string, targetCircleId: string) => void;
  onEditCircle?: (circleId: string, updates: Partial<Circle>) => void;
  onDeleteCircle?: (circleId: string) => void;
  autoEditName?: boolean;
}

function frequencyLabel(days: number): string {
  if (days <= 7) return "Weekly";
  if (days <= 14) return "Bi-weekly";
  if (days <= 21) return "Every 3 weeks";
  return "Monthly";
}

export function CircleCard({
  circle,
  members,
  allCircles,
  onMovePerson,
  onEditCircle,
  onDeleteCircle,
  autoEditName,
}: CircleCardProps) {
  const [editingName, setEditingName] = useState(autoEditName ?? false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [nameValue, setNameValue] = useState(circle.name);
  const [descValue, setDescValue] = useState(circle.description);

  const otherCircles = allCircles.filter((c) => c.id !== circle.id);

  function commitName() {
    setEditingName(false);
    if (nameValue.trim() && nameValue !== circle.name) {
      onEditCircle?.(circle.id, { name: nameValue.trim() });
    } else {
      setNameValue(circle.name);
    }
  }

  function commitDesc() {
    setEditingDesc(false);
    if (descValue !== circle.description) {
      onEditCircle?.(circle.id, { description: descValue });
    } else {
      setDescValue(circle.description);
    }
  }

  return (
    <div id={`circle-${circle.id}`} className="rounded-xl border border-border bg-card p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-lg" role="img" aria-label={circle.name}>
          {circle.emoji}
        </span>
        {editingName ? (
          <div className="flex items-center gap-1 flex-1">
            <input
              autoFocus
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onBlur={commitName}
              onKeyDown={(e) => e.key === "Enter" && commitName()}
              onFocus={(e) => e.target.select()}
              className="font-medium text-sm bg-transparent border-b border-primary outline-none flex-1"
            />
            <button
              type="button"
              onClick={commitName}
              className="text-primary"
            >
              <Check className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onDeleteCircle?.(circle.id);
              }}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <h3 className="font-medium text-sm">{circle.name}</h3>
        )}
        {!editingName && (
          <>
            <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-full">
              {frequencyLabel(circle.contactFrequencyDays)}
            </span>
            <span className="text-xs text-muted-foreground ml-auto">
              {members.length} people
            </span>
            <button
              type="button"
              onClick={() => setEditingName(true)}
              className="p-1 rounded-md hover:bg-accent text-muted-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>

      {/* Description */}
      {editingDesc ? (
        <div className="flex items-start gap-1">
          <textarea
            autoFocus
            value={descValue}
            onChange={(e) => setDescValue(e.target.value)}
            onBlur={commitDesc}
            rows={2}
            className="text-xs text-muted-foreground bg-transparent border border-border rounded-md p-1.5 outline-none flex-1 resize-none"
          />
        </div>
      ) : (
        <p
          className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
          onClick={() => setEditingDesc(true)}
        >
          {circle.description}
        </p>
      )}

      {/* Members grid */}
      <div className="flex flex-wrap gap-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center gap-1 group relative"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary`}
              title={member.name}
            >
              {member.avatarInitials}
            </div>
            <span className="text-[10px] text-muted-foreground truncate max-w-[56px] text-center">
              {member.name.split(" ")[0]}
            </span>
            {otherCircles.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="absolute -top-1 -right-1 p-0.5 rounded-full bg-card border border-border opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowRightLeft className="h-2.5 w-2.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[140px]">
                  {otherCircles.map((c) => (
                    <DropdownMenuItem
                      key={c.id}
                      onClick={() => onMovePerson?.(member.id, c.id)}
                    >
                      <span className="mr-1.5">{c.emoji}</span>
                      {c.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        ))}
        <a
          href="/app/circles/add"
          className="flex flex-col items-center gap-1"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground hover:bg-accent transition-colors">
            <Plus className="h-4 w-4" />
          </div>
          <span className="text-[10px] text-muted-foreground">Add</span>
        </a>
      </div>
    </div>
  );
}
