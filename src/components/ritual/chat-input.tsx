import { Send } from "lucide-react";

interface ChatInputProps {
  placeholder?: string;
}

export function ChatInput({
  placeholder = "Type a message...",
}: ChatInputProps) {
  return (
    <div className="flex items-center gap-2 p-3 bg-card border-t border-border shrink-0">
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 bg-secondary text-foreground placeholder:text-muted-foreground rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
        readOnly
      />
      <button
        type="button"
        className="flex items-center justify-center h-9 w-9 rounded-full text-primary hover:bg-secondary transition-colors"
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </button>
    </div>
  );
}
