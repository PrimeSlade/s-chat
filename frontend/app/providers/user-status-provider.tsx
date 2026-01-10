"use client";
import { useFriendsStatus } from "@/hooks/use-friends";
import { socket } from "@/lib/socket";
import { ResponseFormat, UserStatus } from "@backend/shared";
import { useQueryClient } from "@tanstack/react-query";
import React, { ReactNode, useEffect } from "react";

export default function UserStatusProvider({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleStatus = (payload: UserStatus) => {
      queryClient.setQueryData(
        ["friends-status"],
        (oldData: ResponseFormat<UserStatus[]>) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.map((friend) =>
              friend.userId === payload.userId
                ? { ...friend, status: payload.status }
                : friend
            ),
          };
        }
      );
    };

    socket.on("user_status", handleStatus);

    return () => {
      socket.off("user_status", handleStatus);
    };
  }, [socket, queryClient]);

  return <div>{children}</div>;
}
