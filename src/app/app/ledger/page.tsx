import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LedgerDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3rem)] p-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl">Ledger</CardTitle>
            <Badge variant="secondary">Desktop</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Multiplayer project management &amp; knowledge base. Desktop-first
            layout with warm amber theme.
          </p>
          <div className="flex gap-2">
            <Button>Explore Demo</Button>
            <Button variant="outline">View Case Study</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
