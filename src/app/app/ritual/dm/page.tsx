"use client";

import { Suspense, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getDMThread, getUserById, currentUser, matches as initialMatches } from "@/data/ritual";
import type { ChatMessage, Match } from "@/data/ritual/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { RitualShell } from "@/components/ritual/ritual-shell";
import { ChatBubble } from "@/components/ritual/chat-bubble";
import { ChatInput } from "@/components/ritual/chat-input";
import { Button } from "@/components/ui/button";
import { RitualPortfolioMenu } from "@/components/ritual/portfolio-menu";

let nextMsgId = 200;

function DMContent() {
  const searchParams = useSearchParams();
  const threadId = searchParams.get("thread") ?? "";
  const staticThread = getDMThread(threadId);

  // Read persisted matches to resolve newly-accepted ones
  const [matchList] = useLocalStorage<Match[]>("ritual-matches", initialMatches);

  // Find the other user — either from a static thread or from the match that owns this threadId
  const matchForThread = matchList.find((m) => m.dmThreadId === threadId);
  const otherUserId = staticThread
    ? staticThread.participantIds.find((id) => id !== currentUser.id)!
    : matchForThread?.userId ?? "";
  const otherUser = getUserById(otherUserId);

  const matchedDate = matchForThread
    ? new Date(matchForThread.matchedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "";

  const [messages, setMessages] = useLocalStorage<ChatMessage[]>(
    `ritual-dm-${threadId}`,
    staticThread?.messages ?? []
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Small delay to ensure localStorage-hydrated content is rendered
    const timeout = setTimeout(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  function handleSend(text: string) {
    setMessages((prev) => [
      ...prev,
      {
        id: `dm-local-${nextMsgId++}`,
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

  if (!otherUser) {
    return (
      <RitualShell current="matches">
        <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
          Conversation not found.
        </div>
      </RitualShell>
    );
  }

  return (
    <RitualShell current="matches">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-border bg-card shrink-0">
          <Link
            href="/app/ritual/matches"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
            <Image
              src={otherUser.photos[0]}
              alt={otherUser.name}
              fill
              className="object-cover"
              sizes="40px"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {otherUser.name}, {otherUser.age}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {otherUser.location} · Matched {matchedDate}
            </p>
          </div>
          <Button size="sm" variant="outline" className="shrink-0 text-xs" asChild>
            <Link href={`/app/ritual/profile/${otherUser.id}`}>
              View Profile
            </Link>
          </Button>
          <RitualPortfolioMenu />
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Matched divider */}
          {matchedDate && (
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Matched on {matchedDate}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
          )}

          {messages.map((msg) => {
            const sender = getUserById(msg.senderId)!;
            return (
              <ChatBubble
                key={msg.id}
                message={msg}
                sender={sender}
                isCurrentUser={msg.senderId === currentUser.id}
                isGroupChat={false}
              />
            );
          })}
        </div>

        {/* Input */}
        <ChatInput
          placeholder={`Message ${otherUser.name.split(" ")[0]}...`}
          onSend={handleSend}
        />
      </div>
    </RitualShell>
  );
}

export default function DMPage() {
  return (
    <Suspense>
      <DMContent />
    </Suspense>
  );
}
