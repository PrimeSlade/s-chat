import { Skeleton } from "../ui/skeleton";

export function ChatHeaderSkeleton() {
  return (
    <div className="flex gap-4 p-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-6 w-32" />
    </div>
  );
}
