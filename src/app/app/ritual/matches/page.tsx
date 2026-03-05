"use client";

import { RitualShell } from "@/components/ritual/ritual-shell";
import { MatchCard } from "@/components/ritual/match-card";
import { matches as initialMatches, getUserById } from "@/data/ritual";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Match } from "@/data/ritual/types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { RitualPortfolioMenu } from "@/components/ritual/portfolio-menu";

export default function MatchesPage() {
  const [matchList, setMatchList] = useLocalStorage<Match[]>("ritual-matches", initialMatches);

  const matchedConnections = matchList.filter((m) => m.status === "matched");
  const requests = matchList.filter(
    (m) => m.status === "pending-received" || m.status === "pending-sent"
  );

  function acceptRequest(matchId: string) {
    setMatchList((prev) =>
      prev.map((m) =>
        m.id === matchId
          ? {
              ...m,
              status: "matched" as const,
              matchedAt: new Date().toISOString(),
              dmThreadId: `dm-${matchId}`,
            }
          : m
      )
    );
  }

  function rejectRequest(matchId: string) {
    setMatchList((prev) => prev.filter((m) => m.id !== matchId));
  }

  return (
    <RitualShell current="matches">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
          <h1 className="font-heading text-xl">Connections</h1>
          <RitualPortfolioMenu />
        </div>

        <div className="p-4 space-y-4">

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
                    <MatchCard
                      key={match.id}
                      match={match}
                      user={user}
                      onAccept={() => acceptRequest(match.id)}
                      onReject={() => rejectRequest(match.id)}
                    />
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
      </div>
    </RitualShell>
  );
}
