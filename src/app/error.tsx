"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold">
        Something went wrong
      </h1>

      <p className="mt-2 text-muted-foreground">
        An unexpected error occurred.
      </p>

      <Button
        className="mt-6"
        onClick={reset}
      >
        Try Again
      </Button>
    </div>
  );
}