"use client";

import { RitualShell } from "@/components/ritual/ritual-shell";
import { MatchCard } from "@/components/ritual/match-card";
import { matches, getUserById } from "@/data/ritual";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const matchedConnections = matches.filter((m) => m.status === "matched");
const requests = matches.filter(
  (m) => m.status === "pending-received" || m.status === "pending-sent"
);

export default function MatchesPage() {
  return (
    <RitualShell current="matches">
      <div className="p-4 space-y-4">
        <h1 className="font-heading text-2xl font-bold">Connections</h1>

        <Tabs defaultValue="matches">
          <TabsList className="w-full">
            <TabsTrigger value="matches" className="flex-1">
              Matches{" "}
              {matchedConnections.length > 0 && (
                <span className="ml-1 text-xs text-muted-foreground">
                  ({matchedConnections.length})
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex-1">
              Requests{" "}
              {requests.length > 0 && (
                <span className="ml-1 text-xs text-muted-foreground">
                  ({requests.length})
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="mt-4">
            {matchedConnections.length > 0 ? (
              <div className="space-y-1">
                {matchedConnections.map((match) => {
                  const user = getUserById(match.userId);
                  if (!user) return null;
                  return (
                    <MatchCard key={match.id} match={match} user={user} />
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No matches yet. Keep engaging with your circle!
              </p>
            )}
          </TabsContent>

          <TabsContent value="requests" className="mt-4">
            {requests.length > 0 ? (
              <div className="space-y-1">
                {requests.map((match) => {
                  const user = getUserById(match.userId);
                  if (!user) return null;
                  return (
                    <MatchCard key={match.id} match={match} user={user} />
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No pending requests.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </RitualShell>
  );
}
