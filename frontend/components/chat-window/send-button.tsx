"use client";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function SendButton() {
  return (
    <Button variant="ghost" size="icon">
      <Send className="h-6 w-6" />
    </Button>
  );
}
