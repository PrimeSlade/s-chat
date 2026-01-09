"use client";
import { useUserLastSeen } from "@/hooks/use-friends";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatlastSeen, getInitials } from "@/lib/utils";

interface ChatHeaderProps {
  userId?: string | null;
  name: string;
  image: string;
}

export default function ChatHeader({ userId, name, image }: ChatHeaderProps) {
  const { data: userLastSeen } = useUserLastSeen(userId!);

  return (
    <div className="flex gap-4 p-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={image} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-lg font-semibold">{name}</h1>
        {userLastSeen?.data && (
          <div className="text-xs text-muted-foreground/70">
            Last seen {formatlastSeen(userLastSeen.data)}
          </div>
        )}
      </div>
    </div>
  );
}
