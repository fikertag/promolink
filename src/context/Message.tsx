"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/context/User";
interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string;
  status: {
    delivered: boolean;
    read: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

interface Conversation {
  _id: string;
  lastMessage: string;
  updatedAt: string;
  unreadCount: string;
  otherUser: {
    name: string;
    image: string;
  };
}

interface MessageContextType {
  conversations: Conversation[];
  currentMessages: Message[];
  selectedConversation: string | null;
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (content: string, conversationId?: string) => Promise<void>;
  markAsRead: (messageId: string) => void;
  startNewConversation: (participantId: string) => Promise<void>;
}

const MessageContext = createContext<MessageContextType>({
  conversations: [],
  currentMessages: [],
  selectedConversation: null,
  fetchConversations: async () => {},
  fetchMessages: async () => {},
  sendMessage: async () => {},
  markAsRead: () => {},
  startNewConversation: async () => {},
});

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  const fetchConversations = async () => {
    try {
      const response = await axios.get(`/api/conversation?userId=${user?.id}`);
      setConversations(response.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await axios.get(
        `/api/conversation/${conversationId}/messages`
      );
      setCurrentMessages(response.data);
      setSelectedConversation(conversationId);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (
    content: string,
    existingConversationId?: string
  ) => {
    try {
      const conversationId = existingConversationId || selectedConversation;

      if (!conversationId || !user?.id) {
        throw new Error("No active conversation");
      }

      const newMessage = {
        conversationId,
        senderId: user.id,
        content,
      };

      const response = await axios.post("/api/message", newMessage);

      setCurrentMessages((prev) => [response.data, ...prev]);
      await fetchConversations(); // Refresh conversation list
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const startNewConversation = async (participantId: string) => {
    try {
      const response = await axios.post("/api/conversation", {
        participantIds: [user?.id, participantId],
      });

      setConversations((prev) => [response.data, ...prev]);
      await fetchMessages(response.data._id);
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      await axios.patch(`/api/message/${messageId}`, { status: "read" });
      setCurrentMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId
            ? { ...msg, status: { ...msg.status, read: true } }
            : msg
        )
      );
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchConversations();
    }
  }, [user?.id]);

  return (
    <MessageContext.Provider
      value={{
        conversations,
        currentMessages,
        selectedConversation,
        fetchConversations,
        fetchMessages,
        sendMessage,
        markAsRead,
        startNewConversation,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};
