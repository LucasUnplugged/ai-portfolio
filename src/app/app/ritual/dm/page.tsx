"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { dmThreads, getDMThread, getUserById, currentUser, matches } from "@/data/ritual";
import type { ChatMessage } from "@/data/ritual/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { RitualShell } from "@/components/ritual/ritual-shell";
import { ChatBubble } from "@/components/ritual/chat-bubble";
import { ChatInput } from "@/components/ritual/chat-input";
import { Button } from "@/components/ui/button";

let nextMsgId = 200;

function DMContent() {
  const searchParams = useSearchParams();
  const threadId = searchParams.get("thread");
  const thread = threadId ? getDMThread(threadId) ?? dmThreads[0] : dmThreads[0];

  const otherUserId = thread.participantIds.find((id) => id !== currentUser.id)!;
  const otherUser = getUserById(otherUserId)!;
  const match = matches.find((m) => m.userId === otherUserId);

  const matchedDate = match
    ? new Date(match.matchedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "";

  const [messages, setMessages] = useLocalStorage<ChatMessage[]>(
    `ritual-dm-${thread.id}`,
    thread.messages
  );

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
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
