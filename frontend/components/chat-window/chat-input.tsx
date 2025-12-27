"use client";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import SendButton from "./send-button";
import { Input } from "../ui/input";

export default function ChatInput() {
  return (
    <div className="flex items-center p-4">
      <Button variant="ghost" size="icon">
        <Paperclip className="h-6 w-6" />
      </Button>
      <Input
        type="text"
        placeholder="Type a message"
        className="flex-1 bg-transparent focus:outline-none"
      />
      <SendButton />
    </div>
  );
}
