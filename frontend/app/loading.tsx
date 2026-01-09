import {
  ChatHeaderSkeleton,
  ChatItemSkeleton,
} from "@/components/chat-list/chat-skeletons";

export default function Loading() {
  return (
    <div className="flex h-screen bg-background">
      <div className="w-[19rem] border-r">
        <div className="border-b">
          <ChatHeaderSkeleton />
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
