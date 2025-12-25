"use client";
import { ChatList } from "../chat-list/chat-list";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";

export function AppSidebar() {
  const { data: session, isPending, error } = useSession();
  if (isPending) return <div>Loading...</div>;

  return (
    <Sidebar>
      <SidebarHeader>
        <h1>Hi, {session!.user.name}</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-0">
          <ChatList />
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
