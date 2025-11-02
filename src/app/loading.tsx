import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 px-16">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    </div>
  );
}
