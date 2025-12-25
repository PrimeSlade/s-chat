"use client";
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
        <SidebarGroup>
          <SidebarGroupLabel>Chat</SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
