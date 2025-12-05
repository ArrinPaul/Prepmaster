"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Mail, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function VerifyEmailPage() {
  const [resending, setResending] = useState(false);

  const handleResend = () => {
    setResending(true);
    setTimeout(() => setResending(false), 2000);
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
            <Mail className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription>
            We've sent a verification link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Please check your email and click the verification link to activate your account.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              Didn't receive the email?
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResend}
              disabled={resending}
            >
              {resending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Resend Verification Email
                </>
              )}
            </Button>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground text-center">
            <p>Tips:</p>
            <ul className="space-y-1 text-left list-disc list-inside">
              <li>Check your spam or junk folder</li>
              <li>Make sure you entered the correct email</li>
              <li>Add noreply@prepmaster.com to your contacts</li>
            </ul>
          </div>

          <div className="pt-4 border-t text-center text-sm">
            <Link href="/auth/login" className="text-muted-foreground hover:text-primary">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
