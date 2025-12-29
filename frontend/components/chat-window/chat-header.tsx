"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";

interface ChatHeaderProps {
  name: string;
  image: string;
}

export default function ChatHeader({ name, image }: ChatHeaderProps) {
  return (
    <div className="flex gap-4 p-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={image} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <h1 className="text-lg font-semibold">{name}</h1>
    </div>
  );
}
