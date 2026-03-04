import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CirclesDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl">Circles</CardTitle>
            <Badge variant="secondary">Mobile</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Relationship maintenance &amp; personal CRM. Clean teal theme with
            rounded elements.
          </p>
          <Button className="w-full">View Circles</Button>
        </CardContent>
      </Card>
    </div>
  );
}
