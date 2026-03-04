import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LedgerDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Ledger</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Multiplayer project management &amp; knowledge base. Desktop-first
            layout with warm amber theme.
          </p>
          <Button>Launch Demo</Button>
        </CardContent>
      </Card>
    </div>
  );
}
