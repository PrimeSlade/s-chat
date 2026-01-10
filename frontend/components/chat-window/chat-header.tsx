"use client";
import { useFriendsStatus, useUserLastSeen } from "@/hooks/use-friends";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { StatusBadge } from "../ui/status-badge";
import { formatlastSeen, getInitials } from "@/lib/utils";

interface ChatHeaderProps {
  userId?: string | null;
  name: string;
  image: string;
}

export default function ChatHeader({ userId, name, image }: ChatHeaderProps) {
  const { data: userLastSeen } = useUserLastSeen(userId!);
  const { data: userStatuses } = useFriendsStatus();

  const userStatus = userStatuses?.data.find((user) => userId === user.userId);

  return (
    <div className="flex gap-4 p-4">
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={image} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        {userStatus?.status === "online" && <StatusBadge size="md" />}
      </div>
      <div>
        <h1 className="font-semibold">{name}</h1>
        {userLastSeen?.data && (
          <div className="text-xs text-muted-foreground/70">
            Last seen {formatlastSeen(userLastSeen.data)}
          </div>
        )}
      </div>
    </div>
  );
}
