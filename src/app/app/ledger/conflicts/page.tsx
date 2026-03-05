import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ConflictPanel } from "@/components/ledger/conflict-panel";
import { conflicts, getUserById, getDocumentById } from "@/data/ledger";

export default function ConflictResolutionPage() {
  const conflict = conflicts[0]; // First unresolved conflict
  const userA = getUserById(conflict.userAId);
  const userB = getUserById(conflict.userBId);
  const document = getDocumentById(conflict.documentId);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-heading font-semibold tracking-tight">
          Conflict Resolution
        </h1>
      </div>

      {/* Conflict Info */}
      <div className="rounded-lg border border-border bg-card p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Conflict in</p>
            <h2 className="text-lg font-semibold">
              {document?.title ?? "Document"}
            </h2>
          </div>
          <Badge variant={conflict.status === "unresolved" ? "destructive" : "default"}>
            {conflict.status}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>Section: {conflict.sectionTitle}</span>
          <span className="hidden md:inline">&middot;</span>
          <div className="flex flex-wrap items-center gap-1.5">
            <span>Between</span>
            <span className="inline-flex items-center gap-1">
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-[8px]">
                  {userA?.avatarInitials}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">
                {userA?.name}
              </span>
            </span>
            <span>and</span>
            <span className="inline-flex items-center gap-1">
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-[8px]">
                  {userB?.avatarInitials}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">
                {userB?.name}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Three-panel diff */}
      <ConflictPanel conflict={conflict} userA={userA} userB={userB} />

      {/* Action buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
        <Button variant="outline" className="w-full md:w-auto">Keep {userA?.name?.split(" ")[0]}&apos;s Version</Button>
        <Button className="w-full md:w-auto">Manual Merge</Button>
        <Button variant="outline" className="w-full md:w-auto">Keep {userB?.name?.split(" ")[0]}&apos;s Version</Button>
      </div>

      <Separator />

      {/* Other conflicts */}
      <section>
        <h2 className="text-lg font-semibold font-heading mb-4">
          All Conflicts ({conflicts.length})
        </h2>
        <div className="space-y-3">
          {conflicts.map((c) => {
            const a = getUserById(c.userAId);
            const b = getUserById(c.userBId);
            const doc = getDocumentById(c.documentId);
            return (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div>
                  <p className="text-sm font-medium">{doc?.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.sectionTitle} &middot; {a?.name} vs {b?.name}
                  </p>
                </div>
                <Badge
                  variant={c.status === "unresolved" ? "destructive" : "default"}
                >
                  {c.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
