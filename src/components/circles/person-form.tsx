"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { circles } from "@/data/circles";

export function PersonForm() {
  const [selectedCircle, setSelectedCircle] = useState<string>("");

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-xs font-medium text-foreground">
          Name
        </label>
        <Input id="name" placeholder="Their name" />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="relationship"
          className="text-xs font-medium text-foreground"
        >
          Relationship
        </label>
        <Input id="relationship" placeholder='e.g. "close friend", "sister"' />
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
        <label
          htmlFor="frequency"
          className="text-xs font-medium text-foreground"
        >
          Contact frequency
        </label>
        <Select>
          <SelectTrigger id="frequency">
            <SelectValue placeholder="How often?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Weekly</SelectItem>
            <SelectItem value="14">Bi-weekly</SelectItem>
            <SelectItem value="30">Monthly</SelectItem>
          </SelectContent>
        </Select>
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
