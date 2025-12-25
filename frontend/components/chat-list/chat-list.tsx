"use client";

import { useState } from "react";
import { ChatItem } from "./chat-item";
import { getInitials } from "@/lib/utils";

// 3. TypeScript Types
type RoomParticipantWithRelations = {
  userId: string;
  roomId: string;
  joinedAt: Date;
  lastReadAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
  room: {
    id: string;
    name: string | null;
    type: "DIRECT" | "GROUP";
    createdAt: Date;
    updatedAt: Date;
    messages: {
      id: string;
      content: string;
      createdAt: Date;
      senderId: string;
      roomId: string;
    }[];
  };
};

// MOCK DATA STRUCTURE
const mockChatData: RoomParticipantWithRelations[] = [
  {
    userId: "user-1",
    roomId: "room-1",
    joinedAt: new Date("2024-12-20T10:00:00"),
    lastReadAt: new Date("2024-12-25T17:00:00"),
    user: {
      id: "user-1",
      name: "Alice Wonder",
      email: "alice@example.com",
      image: "https://github.com/shadcn.png",
    },
    room: {
      id: "room-1",
      name: null,
      type: "DIRECT",
      createdAt: new Date("2024-12-20T10:00:00"),
      updatedAt: new Date("2024-12-25T18:04:00"),
      messages: [
        {
          id: "msg-1",
          content: "Hey! How are you doing?",
          createdAt: new Date("2024-12-25T18:04:00"),
          senderId: "user-1",
          roomId: "room-1",
        },
        {
          id: "msg-2",
          content:
            "Want to grab coffee later? It's on me this time, I promise!",
          createdAt: new Date("2024-12-25T18:04:30"),
          senderId: "user-1",
          roomId: "room-1",
        },
      ],
    },
  },
  {
    userId: "user-2",
    roomId: "room-2",
    joinedAt: new Date("2024-12-24T10:00:00"),
    lastReadAt: new Date("2024-12-25T17:39:00"),
    user: {
      id: "user-2",
      name: "Bob Builder",
      email: "bob@example.com",
      image: null,
    },
    room: {
      id: "room-2",
      name: null,
      type: "DIRECT",
      createdAt: new Date("2024-12-24T10:00:00"),
      updatedAt: new Date("2024-12-25T17:39:00"),
      messages: [
        {
          id: "msg-3",
          content: "Can we fix it?",
          createdAt: new Date("2024-12-25T17:39:00"),
          senderId: "user-2",
          roomId: "room-2",
        },
      ],
    },
  },
  {
    userId: "user-3",
    roomId: "room-3",
    joinedAt: new Date("2024-12-23T10:00:00"),
    lastReadAt: new Date("2024-12-25T16:00:00"),
    user: {
      id: "user-3",
      name: "Design Team",
      email: "design@example.com",
      image: "https://github.com/vercel.png",
    },
    room: {
      id: "room-3",
      name: "Design Team",
      type: "GROUP",
      createdAt: new Date("2024-12-23T10:00:00"),
      updatedAt: new Date("2024-12-25T17:09:00"),
      messages: [
        {
          id: "msg-4",
          content: "The new mockups look great!",
          createdAt: new Date("2024-12-25T17:09:00"),
          senderId: "user-3",
          roomId: "room-3",
        },
      ],
    },
  },
  {
    userId: "user-4",
    roomId: "room-4",
    joinedAt: new Date("2024-12-23T10:00:00"),
    lastReadAt: new Date("2024-12-25T18:00:00"),
    user: {
      id: "user-4",
      name: "Empty Room",
      email: "empty@example.com",
      image: null,
    },
    room: {
      id: "room-4",
      name: "Empty Room",
      type: "GROUP",
      createdAt: new Date("2024-12-23T10:00:00"),
      updatedAt: new Date("2024-12-24T11:09:00"),
      messages: [],
    },
  },
];

export function ChatList() {
  const [activeRoomId, setActiveRoomId] = useState<string | null>("room-1");

  const handleItemClick = (roomId: string) => {
    setActiveRoomId(roomId);
    console.log(`Entering room: ${roomId}`);
  };

  const sortedChats = [...mockChatData].sort(
    (a, b) => b.room.updatedAt.getTime() - a.room.updatedAt.getTime()
  );

  return (
    <div className="flex flex-col gap-1 p-2">
      {sortedChats.map((participant) => {
        const { room, user, lastReadAt } = participant;

        //last message
        const lastMessage =
          room.messages.length > 0
            ? room.messages[room.messages.length - 1]
            : null;

        //calc unread count
        const unreadCount = room.messages.filter(
          (msg) => new Date(msg.createdAt) > new Date(lastReadAt)
        ).length;

        const displayName = room.type === "GROUP" ? room.name : user.name;

        //Avatar fallback
        const initials = getInitials(displayName || "");

        return (
          <ChatItem
            key={room.id}
            roomId={room.id}
            name={displayName || "Unknown"}
            lastMessage={lastMessage?.content || "No messages yet"}
            timestamp={room.updatedAt}
            unreadCount={unreadCount}
            initials={initials}
            avatarUrl={user.image || undefined}
            isActive={activeRoomId === room.id}
            onClick={handleItemClick}
          />
        );
      })}
    </div>
  );
}
