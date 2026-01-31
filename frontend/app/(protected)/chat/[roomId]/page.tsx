"use client";
import { ChatWindow } from "@/components/chat-window/chat-window";
import { socket } from "@/lib/socket";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ResponseFormat, RoomWithActiveMembers } from "@backend/shared";

export default function ChatPage() {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("📍 Joining room:", roomId);
    socket.emit("join_room", { roomId });

    // const handleUserJoin = () => {
    //   console.log("👤 User joined room:", roomId);
    //   queryClient.setQueryData<ResponseFormat<RoomWithActiveMembers>>(
    //     ["room", "me", roomId],
    //     (oldData) => {
    //       if (!oldData) return oldData;
    //       return {
    //         ...oldData,
    //         data: {
    //           ...oldData.data,
    //           activeMembers: oldData.data.activeMembers + 1,
    //         },
    //       };
    //     }
    //   );
    // };

    // const handleUserLeave = () => {
    //   console.log("👤 User left room:", roomId);
    //   queryClient.setQueryData<ResponseFormat<RoomWithActiveMembers>>(
    //     ["room", "me", roomId],
    //     (oldData) => {
    //       if (!oldData) return oldData;
    //       return {
    //         ...oldData,
    //         data: {
    //           ...oldData.data,
    //           activeMembers: Math.max(0, oldData.data.activeMembers - 1),
    //         },
    //       };
    //     }
    //   );
    // };

    // socket.on("user_join", handleUserJoin);
    // socket.on("user_leave", handleUserLeave);

    return () => {
      console.log("📍 Leaving room:", roomId);
      socket.emit("leave_room", { roomId });
      // socket.off("user_join", handleUserJoin);
      // socket.off("user_leave", handleUserLeave);
    };
  }, [roomId, queryClient]);

  return (
    <div>
      <ChatWindow roomId={roomId as string} />
    </div>
  );
}
