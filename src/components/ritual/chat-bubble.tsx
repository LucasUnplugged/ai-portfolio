import Image from "next/image";
import type { ChatMessage, RitualUser } from "@/data/ritual/types";

interface ChatBubbleProps {
  message: ChatMessage;
  sender: RitualUser;
  isCurrentUser: boolean;
  isGroupChat?: boolean;
  reactions?: string[];
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
  reactions,
}: ChatBubbleProps) {
  const hasPhoto = sender.photos?.length > 0;

  return (
    <div
      className={`flex gap-2 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {isGroupChat && !isCurrentUser && (
        <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mt-1">
          {hasPhoto ? (
            <Image
              src={sender.photos[0]}
              alt={sender.name}
              fill
              className="object-cover"
              sizes="28px"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center text-[10px] text-secondary-foreground">
              {sender.avatarInitials}
            </div>
          )}
        </div>
      )}

      <div
        className={`max-w-[80%] ${isCurrentUser ? "items-end" : "items-start"} flex flex-col`}
      >
        {isGroupChat && !isCurrentUser && (
          <span className="text-[11px] text-muted-foreground mb-0.5 px-1">
            {sender.name.split(" ")[0]}
          </span>
        )}

        {message.gifUrl ? (
          <div className="rounded-xl overflow-hidden max-w-[200px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={message.gifUrl}
              alt="GIF"
              className="w-full h-auto"
            />
          </div>
        ) : (
          <div
            className={`px-3 py-2 ${
              message.type === "prompt-response"
                ? "bg-card border border-primary/40 rounded-xl"
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
        )}

        {reactions && reactions.length > 0 && (
          <div className="flex gap-0.5 mt-0.5 px-1">
            <span className="text-xs bg-muted rounded-full px-1.5 py-0.5">
              {reactions.join("")}
            </span>
          </div>
        )}

        <span className="text-[10px] text-muted-foreground mt-0.5 px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
