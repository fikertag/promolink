"use client";

import { MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  _id: string;
  content: string;
  senderId: string;
  createdAt: string;
}

interface User {
  id: string;
}

interface MessageAreaProps {
  currentMessages: Message[];
  user: User | null;
  formatTime: (dateString: string) => string;
}

export function MessageArea({
  currentMessages,
  user,
  formatTime,
}: MessageAreaProps) {
  return (
    <div className="p-4 ">
      {currentMessages.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <MessageSquare size={48} className="mb-4 opacity-50" />
          <p>No messages yet</p>
          <p className="text-sm">Start the conversation</p>
        </div>
      ) : (
        <div className="space-y-3">
          {[...currentMessages].reverse().map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.senderId === user?.id ? "justify-end" : "justify-start"
              }`}
            >
              <Card
                className={`max-w-xs lg:max-w-md min-w-30 px-4 py-2 ${
                  message.senderId === user?.id
                    ? "bg-primary text-white border-primary"
                    : "bg-white border-gray-200"
                } shadow-sm`}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-xs mt-1 text-right ${
                    message.senderId === user?.id
                      ? "text-primary-100"
                      : "text-gray-500"
                  }`}
                >
                  {formatTime(message.createdAt)}
                </p>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
