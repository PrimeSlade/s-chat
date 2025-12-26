import { AddFriendDialog } from "@/components/people/add-friend-dialog";
import NavBar from "@/components/navbar/nav-bar";
import React, { ReactNode } from "react";
import ChatNavBar from "@/components/navbar/chat-nav-bar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="border-b p-0">
        <ChatNavBar />
      </div>
      <div>{children}</div>
    </div>
  );
}
