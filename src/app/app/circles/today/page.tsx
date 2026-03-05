"use client";

import { CirclesShell } from "@/components/circles/circles-shell";
import { CirclesPortfolioMenu } from "@/components/circles/portfolio-menu";
import { ReminderCard } from "@/components/circles/reminder-card";
import { getRemindersForToday, getPersonById } from "@/data/circles";

const todayReminders = getRemindersForToday();

function formatDate(): string {
  return new Date("2026-03-04").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function TodayPage() {
  return (
    <CirclesShell current="today">
      <div className="p-4 space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold">Good morning</h1>
            <p className="text-sm text-muted-foreground">{formatDate()}</p>
          </div>
          <CirclesPortfolioMenu />
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            People to reach out to
          </h2>
          {todayReminders.length > 0 ? (
            <div className="space-y-2.5">
              {todayReminders.map((reminder) => {
                const person = getPersonById(reminder.personId);
                if (!person) return null;
                return (
                  <ReminderCard
                    key={reminder.id}
                    reminder={reminder}
                    person={person}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                All caught up! You&apos;re doing great.
              </p>
            </div>
          )}
        </div>
      </div>
    </CirclesShell>
  );
}
