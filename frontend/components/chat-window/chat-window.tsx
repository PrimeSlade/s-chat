"use client";
import React from "react";
import ChatHeader from "./chat-header";
import { useUserById } from "@/hooks/use-friends";
import { useRoomByUserId } from "@/hooks/use-rooms";
import ChatInput from "./chat-input";

interface ChatWindowProps {
  roomId?: string;
  userId?: string;
  isGhostMode?: boolean;
}

export function ChatWindow({
  roomId,
  userId,
  isGhostMode = false,
}: ChatWindowProps) {
  const { data: ghostUser } = useUserById(userId!);
  //  const { data: roomData } = useRoomByUserId(roomId!);

  let name;
  let image;

  if (isGhostMode && ghostUser) {
    name = ghostUser?.data.name;
    image = ghostUser?.data.image;
  } else {
    // name = roomData?.data.room.participants[0].user.name;
    // image = roomData?.data.room.participants[0].user.image;
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b">
        <ChatHeader />
      </div>

      <div className="h-full flex items-center justify-center text-gray-400">
        {isGhostMode ? "Start a new conversation" : "No messages yet"}
      </div>

      {/* Input at bottom */}
      <div className="border-t">
        <ChatInput />
      </div>
    </div>
  );
}
