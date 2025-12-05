"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code2, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TwoFactorPage() {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <Code2 className="h-6 w-6" />
            <span className="font-bold text-xl">PrepMaster</span>
          </Link>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Shield className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Two-Factor Authentication</CardTitle>
          <CardDescription>
            Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Authentication Code</Label>
              <Input
                id="code"
                placeholder="000000"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className="text-center text-2xl tracking-widest"
                required
              />
              <p className="text-xs text-muted-foreground text-center">
                Open your authenticator app to get your code
              </p>
            </div>

            <Button type="submit" className="w-full">
              Verify Code
            </Button>

            <div className="text-center">
              <Button variant="ghost" size="sm" type="button">
                Use backup code instead
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t">
            <div className="text-sm text-muted-foreground text-center space-y-2">
              <p>Having trouble?</p>
              <Link href="/help" className="text-primary hover:underline block">
                Get help with 2FA
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
