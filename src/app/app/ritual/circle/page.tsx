"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, X } from "lucide-react";
import { RitualShell } from "@/components/ritual/ritual-shell";
import { PromptCard } from "@/components/ritual/prompt-card";
import { ChatBubble } from "@/components/ritual/chat-bubble";
import { ChatInput } from "@/components/ritual/chat-input";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  activeCircle,
  groupMessages as initialGroupMessages,
  getUserById,
  currentUser,
} from "@/data/ritual";
import type { ChatMessage } from "@/data/ritual/types";

// Calculate day info
const now = new Date("2026-03-04");
const end = new Date(activeCircle.endDate);
const start = new Date(activeCircle.startDate);
const totalDays = Math.ceil(
  (end.getTime() - start.getTime()) / 86_400_000
);
const elapsed = Math.ceil(
  (now.getTime() - start.getTime()) / 86_400_000
);
const dayNumber = Math.max(1, Math.min(elapsed, totalDays));
const daysRemaining = Math.max(0, totalDays - elapsed);

// Inline GIF messages
const gifMessages: ChatMessage[] = [
  {
    id: "gm-gif-1",
    senderId: "ru-07",
    text: "",
    timestamp: "2026-03-01T11:20:00Z",
    type: "text",
    gifUrl: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
  },
  {
    id: "gm-gif-2",
    senderId: "ru-06",
    text: "",
    timestamp: "2026-03-03T09:50:00Z",
    type: "text",
    gifUrl: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
  },
];

// allMessages computed inside component after localStorage hydration

// Static emoji reactions
const messageReactions: Record<string, string[]> = {
  "gm-04": ["💜", "👍"],
  "gm-06": ["😍"],
  "gm-11": ["🤩"],
  "gm-17": ["😍", "🐕"],
};

// Group messages by date for day dividers
function getDateLabel(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Members list
const members = activeCircle.memberIds
  .map((id) => getUserById(id))
  .filter(Boolean) as NonNullable<ReturnType<typeof getUserById>>[];

export default function CirclePage() {
  const [storedMessages, setStoredMessages] = useLocalStorage<ChatMessage[]>("ritual-group-messages", initialGroupMessages);
  const [showMembers, setShowMembers] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleSend(text: string) {
    setStoredMessages((prev) => [
      ...prev,
      {
        id: `gm-local-${Date.now()}`,
        senderId: currentUser.id,
        text,
        timestamp: new Date().toISOString(),
        type: "text",
      },
    ]);
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  const allMessages = useMemo(
    () => [...storedMessages, ...gifMessages].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    ),
    [storedMessages]
  );

  const hasRespondedToPrompt = allMessages.some(
    (m) => m.senderId === currentUser.id && m.type === "prompt-response" && m.promptId === activeCircle.currentPrompt.id
  );

  useEffect(() => {
    if (!hasRespondedToPrompt) return;
    const timeout = setTimeout(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
    return () => clearTimeout(timeout);
  }, [hasRespondedToPrompt]);

  function handlePromptRespond(text: string) {
    setStoredMessages((prev) => [
      ...prev,
      {
        id: `gm-local-${Date.now()}`,
        senderId: currentUser.id,
        text,
        timestamp: new Date().toISOString(),
        type: "prompt-response",
        promptId: activeCircle.currentPrompt.id,
      },
    ]);
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  let lastDateLabel = "";

  return (
    <RitualShell current="circle">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
          <h1 className="font-heading text-xl">Circle</h1>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              {daysRemaining} day{daysRemaining !== 1 ? "s" : ""} left
            </span>
            <button
              onClick={() => setShowMembers(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="View members"
            >
              <Users className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {/* Prompt card */}
          <div className="p-4 pb-2">
            <PromptCard
              prompt={activeCircle.currentPrompt}
              dayNumber={dayNumber}
              hasResponded={hasRespondedToPrompt}
              onRespond={handlePromptRespond}
            />
          </div>

          {/* Chat feed */}
          <div className="px-4 pb-4 space-y-3">
            {allMessages.map((message) => {
              const sender = getUserById(message.senderId);
              if (!sender) return null;

              const dateLabel = getDateLabel(message.timestamp);
              const showDivider = dateLabel !== lastDateLabel;
              lastDateLabel = dateLabel;

              return (
                <div key={message.id}>
                  {showDivider && (
                    <div className="flex items-center gap-3 py-3">
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {dateLabel}
                      </span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                  )}
                  <ChatBubble
                    message={message}
                    sender={sender}
                    isCurrentUser={message.senderId === currentUser.id}
                    isGroupChat
                    reactions={messageReactions[message.id]}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat input */}
        <ChatInput onSend={handleSend} />

        {/* Members panel (animated) */}
        <div
          className={`absolute inset-0 z-50 flex items-end transition-opacity duration-300 ${
            showMembers
              ? "bg-background/80 backdrop-blur-sm opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setShowMembers(false)}
        >
          <div
            className={`w-full bg-card border-t border-border rounded-t-2xl max-h-[70%] flex flex-col transition-transform duration-300 ease-out ${
              showMembers ? "translate-y-0" : "translate-y-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
              <h2 className="font-heading font-semibold text-sm">
                Circle Members ({members.length})
              </h2>
              <button
                onClick={() => setShowMembers(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto p-2">
              {members.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={user.photos[0]}
                      alt={user.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user.name}, {user.age}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.location}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0" asChild>
                    <Link href={`/app/ritual/profile/${user.id}`}>View</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RitualShell>
  );
}
