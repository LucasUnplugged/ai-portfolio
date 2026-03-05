import { ChangeDiff } from "@/components/ledger/change-diff";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { changes, getUserById } from "@/data/ledger";

// Use the second change (pending, has 2 comments) for a richer demo
const change = changes[1];
const author = getUserById(change.authorId);

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export default function ChangesPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Change header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-heading font-semibold tracking-tight">
              {change.title}
            </h1>
            <Badge className={statusStyles[change.status]}>
              {change.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {author && (
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-[9px]">
                  {author.avatarInitials}
                </AvatarFallback>
              </Avatar>
            )}
            <span>
              by {author?.name ?? "Unknown"} &middot;{" "}
              {new Date(change.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Diff viewer */}
      <ChangeDiff change={change} author={author} />

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <Button size="sm">Approve</Button>
        <Button size="sm" variant="outline">
          Request Changes
        </Button>
      </div>

      <Separator />

      {/* Comments section */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium">
          Comments ({change.comments.length})
        </h2>
        <div className="space-y-3">
          {change.comments.map((comment, i) => {
            const commentAuthor = getUserById(comment.authorId);
            return (
              <div key={i} className="flex gap-3">
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="text-[10px]">
                    {commentAuthor?.avatarInitials ?? "??"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">
                      {commentAuthor?.name ?? "Unknown"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {comment.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
