"use client";

import { Users } from "lucide-react";
import { RitualShell } from "@/components/ritual/ritual-shell";
import { ChatBubble } from "@/components/ritual/chat-bubble";
import { ChatInput } from "@/components/ritual/chat-input";
import {
  groupMessages,
  getUserById,
  currentUser,
  activeCircle,
} from "@/data/ritual";

const sortedMessages = [...groupMessages].sort(
  (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
);

export default function GroupChatPage() {
  return (
    <RitualShell current="chat">
      <div className="flex flex-col h-full">
        {/* Chat header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background shrink-0">
          <div>
            <h1 className="text-sm font-semibold font-heading">
              {activeCircle.name}
            </h1>
            <p className="text-xs text-muted-foreground">
              {activeCircle.memberIds.length} members
            </p>
          </div>
          <Users className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {sortedMessages.map((message) => {
            const sender = getUserById(message.senderId);
            if (!sender) return null;
            return (
              <ChatBubble
                key={message.id}
                message={message}
                sender={sender}
                isCurrentUser={message.senderId === currentUser.id}
                isGroupChat
              />
            );
          })}
        </div>

        {/* Chat input */}
        <ChatInput placeholder="Message the circle..." />
      </div>
    </RitualShell>
  );
}
