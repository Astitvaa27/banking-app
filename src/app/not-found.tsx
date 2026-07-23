import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>

      <Button
        render={
            <Link href="/dashboard" />
        }
        className="mt-6"
        >
        Back to Dashboard
      </Button>
    </div>
  );
}