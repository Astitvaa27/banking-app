import { Skeleton } from "@/components/ui/skeleton";

export default function PageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-64" />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
      </div>

      <Skeleton className="h-80 rounded-xl" />
    </div>
  );
}