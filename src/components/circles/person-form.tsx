"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { circles, people, getLabelColor } from "@/data/circles";
import { X } from "lucide-react";

// Collect all unique labels from existing people for suggestions
const allLabels = Array.from(new Set(people.flatMap((p) => p.labels)));

export function PersonForm() {
  const [selectedCircle, setSelectedCircle] = useState<string>("");
  const [labels, setLabels] = useState<string[]>([]);
  const [labelInput, setLabelInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = allLabels.filter(
    (l) =>
      l.toLowerCase().includes(labelInput.toLowerCase()) &&
      !labels.includes(l)
  );

  function addLabel(label: string) {
    const trimmed = label.trim();
    if (trimmed && !labels.includes(trimmed)) {
      setLabels([...labels, trimmed]);
    }
    setLabelInput("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  }

  function removeLabel(label: string) {
    setLabels(labels.filter((l) => l !== label));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.key === "Enter" || e.key === ",") && labelInput.trim()) {
      e.preventDefault();
      addLabel(labelInput);
    }
    if (e.key === "Backspace" && !labelInput && labels.length > 0) {
      removeLabel(labels[labels.length - 1]);
    }
  }

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-xs font-medium text-foreground">
          Name
        </label>
        <Input id="name" placeholder="Their name" />
      </div>

      <div className="space-y-1.5">
        <p className="text-xs font-medium text-foreground">Circle</p>
        <div className="flex flex-wrap gap-2">
          {circles.map((circle) => (
            <button
              key={circle.id}
              type="button"
              onClick={() => setSelectedCircle(circle.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedCircle === circle.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {circle.emoji} {circle.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-xs font-medium text-foreground">Labels</p>
        <div className="flex flex-wrap gap-1.5 mb-1.5">
          {labels.map((label) => (
            <span
              key={label}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${getLabelColor(label)}`}
            >
              {label}
              <button
                type="button"
                onClick={() => removeLabel(label)}
                className="hover:opacity-70"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="relative">
          <Input
            ref={inputRef}
            value={labelInput}
            onChange={(e) => {
              setLabelInput(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder="Type a label and press Enter..."
          />
          {showSuggestions && labelInput && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-md border border-border bg-popover p-1 shadow-md z-10 max-h-32 overflow-y-auto">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => addLabel(suggestion)}
                  className="w-full text-left rounded px-2 py-1.5 text-xs hover:bg-accent transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="birthday"
          className="text-xs font-medium text-foreground"
        >
          Birthday{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Input id="birthday" type="date" />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="notes" className="text-xs font-medium text-foreground">
          Notes{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Textarea id="notes" placeholder="Anything you want to remember..." rows={3} />
      </div>

      <Button className="w-full" type="submit">
        Add to Circle
      </Button>
    </form>
  );
}
