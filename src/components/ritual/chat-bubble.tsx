import type { ChatMessage, RitualUser } from "@/data/ritual/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatBubbleProps {
  message: ChatMessage;
  sender: RitualUser;
  isCurrentUser: boolean;
  isGroupChat?: boolean;
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function ChatBubble({
  message,
  sender,
  isCurrentUser,
  isGroupChat = false,
}: ChatBubbleProps) {
  return (
    <div
      className={`flex gap-2 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {isGroupChat && !isCurrentUser && (
        <Avatar size="sm" className="shrink-0 mt-1">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-[10px]">
            {sender.avatarInitials}
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={`max-w-[80%] ${isCurrentUser ? "items-end" : "items-start"} flex flex-col`}
      >
        {isGroupChat && !isCurrentUser && (
          <span className="text-[11px] text-muted-foreground mb-0.5 px-1">
            {sender.name.split(" ")[0]}
          </span>
        )}

        <div
          className={`px-3 py-2 ${
            message.type === "prompt-response"
              ? "bg-card border border-border rounded-xl"
              : isCurrentUser
                ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md"
                : "bg-secondary text-secondary-foreground rounded-2xl rounded-bl-md"
          }`}
        >
          {message.type === "prompt-response" && (
            <span className="text-[10px] text-primary font-medium block mb-1">
              Response to prompt
            </span>
          )}
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>

        <span className="text-[10px] text-muted-foreground mt-0.5 px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
