"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { CirclesPortfolioMenu } from "@/components/circles/portfolio-menu";
import { Badge } from "@/components/ui/badge";
import { CirclesShell } from "@/components/circles/circles-shell";
import { InteractionItem } from "@/components/circles/interaction-item";
import {
  people,
  getInteractionsForPerson,
  getCircleById,
  getLabelColor,
  getMessagesForPerson,
} from "@/data/circles";
import type { Message } from "@/data/circles";

const person = people[0]; // Maya Chen
const personInteractions = getInteractionsForPerson(person.id);
const circle = getCircleById(person.circleId);
const initialMessages = getMessagesForPerson(person.id);

function formatRelativeTime(timestamp: string): string {
  const diff = Math.floor(
    (new Date("2026-03-04T12:00:00Z").getTime() - new Date(timestamp).getTime()) / 1000
  );
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 172800) return "Yesterday";
  return `${Math.floor(diff / 86400)}d ago`;
}

function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function groupByDate(msgs: Message[]): { date: string; messages: Message[] }[] {
  const groups: { date: string; messages: Message[] }[] = [];
  let currentDate = "";
  for (const msg of msgs) {
    const date = new Date(msg.timestamp).toDateString();
    if (date !== currentDate) {
      currentDate = date;
      groups.push({ date: formatDate(msg.timestamp), messages: [] });
    }
    groups[groups.length - 1].messages.push(msg);
  }
  return groups;
}

let nextMsgId = 100;

export default function PersonProfilePage() {
  const [messageList, setMessageList] = useLocalStorage<Message[]>(`circles-messages-${person.id}`, initialMessages);
  const [inputText, setInputText] = useState("");

  function sendMessage() {
    const text = inputText.trim();
    if (!text) return;
    setMessageList((prev) => [
      ...prev,
      {
        id: `msg-local-${nextMsgId++}`,
        personId: person.id,
        content: text,
        timestamp: new Date().toISOString(),
        fromMe: true,
      },
    ]);
    setInputText("");
  }

  const messageGroups = groupByDate(messageList);

  return (
    <CirclesShell current="overview">
      <div className="flex flex-col h-full">
        <div className="p-4 space-y-4 border-b border-border">
          {/* Back link + menu */}
          <div className="flex items-start justify-between">
            <Link
              href="/app/circles/overview"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Link>
            <CirclesPortfolioMenu />
          </div>

          {/* Compact profile header */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {person.avatarInitials}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-semibold">{person.name}</h1>
              <div className="flex flex-wrap gap-1 mt-0.5">
                {person.labels.map((label) => (
                  <span
                    key={label}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getLabelColor(label)}`}
                  >
                    {label}
                  </span>
                ))}
                {circle && (
                  <span className="text-[10px] text-muted-foreground">
                    · {circle.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-xs text-foreground/70 leading-relaxed">
            {person.bio}
          </p>

          {/* Interests */}
          <div className="flex flex-wrap gap-1">
            {person.interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="text-[10px]">
                {interest}
              </Badge>
            ))}
          </div>

          {/* Interaction history */}
          {personInteractions.length > 0 && (
            <div className="space-y-1.5">
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Interaction History
              </h2>
              <div>
                {personInteractions.map((interaction) => (
                  <InteractionItem
                    key={interaction.id}
                    interaction={interaction}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Messages section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Messages
          </h2>
          {messageList.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No messages yet. Start a conversation!
            </p>
          ) : (
            messageGroups.map((group) => (
              <div key={group.date} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[10px] text-muted-foreground">
                    {group.date}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                {group.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.fromMe ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${
                        msg.fromMe
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 px-1">
                      {formatRelativeTime(msg.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Compose input */}
        <div className="border-t border-border p-3 flex items-center gap-2">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className="rounded-full bg-primary p-2 text-primary-foreground disabled:opacity-40 transition-opacity"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </CirclesShell>
  );
}
