import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
}

interface ChatMessageProps {
  message: Message;
  className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, className }) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={cn(
        "flex gap-3 max-w-full p-3",
        isUser ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      <Avatar className={cn("h-8 w-8", isUser ? "bg-blue-600" : "bg-gray-800")}>
        <AvatarFallback>{isUser ? "U" : "AI"}</AvatarFallback>
      </Avatar>

      <Card
        className={cn(
          "px-3 py-2 max-w-[80%]",
          isUser
            ? "bg-[#262624] text-white border-none"
            : "bg-[#141413] text-white border-gray-700"
        )}
      >
        <p>{message.text}</p>
      </Card>
    </div>
  );
};

export default ChatMessage;
