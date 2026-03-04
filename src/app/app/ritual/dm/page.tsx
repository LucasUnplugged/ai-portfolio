"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { dmThreads, getUserById, currentUser } from "@/data/ritual";
import { RitualShell } from "@/components/ritual/ritual-shell";
import { ChatBubble } from "@/components/ritual/chat-bubble";
import { ChatInput } from "@/components/ritual/chat-input";

const thread = dmThreads[0];
const otherUserId = thread.participantIds.find((id) => id !== currentUser.id)!;
const otherUser = getUserById(otherUserId)!;

export default function DMPage() {
  return (
    <RitualShell current="matches">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card shrink-0">
          <Link
            href="/app/ritual/matches"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="font-heading font-semibold text-sm">
            {otherUser.name}
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {thread.messages.map((msg) => {
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
        />
      </div>
    </RitualShell>
  );
}
