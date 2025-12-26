import {
  ChatHeaderSkeleton,
  ChatItemSkeleton,
  ChatMessageSkeleton,
} from "@/components/chat-list/chat-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen bg-background">
      <div className="w-[19rem] border-r">
        <div className="flex items-center gap-4 p-4 border-b">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="space-y-6 p-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <ChatItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
