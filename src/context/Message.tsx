"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { useUser } from "@/context/User";

interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

interface Conversation {
  _id: string;
  lastMessage: string;
  updatedAt: string;
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
  startNewConversation: (participantId: string) => Promise<Conversation>;
}

const MessageContext = createContext<MessageContextType>({
  conversations: [],
  currentMessages: [],
  selectedConversation: null,
  fetchConversations: async () => {},
  fetchMessages: async () => {},
  sendMessage: async () => {},
  startNewConversation: async () => {
    return Promise.reject("startNewConversation is not implemented");
  },
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
      if (!user) return;
      const response = await axios.get(`/api/conversation?userId=${user.id}`);
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
      if (!conversationId || !user?.id) return;

      const newMessage = {
        conversationId,
        senderId: user.id,
        content,
      };

      // const response =
      await axios.post("/api/message", newMessage);
      // setCurrentMessages((prev) => [response.data, ...prev]);
      await fetchConversations();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const startNewConversation = async (participantId: string) => {
    try {
      const response = await axios.post("/api/conversation", {
        participantIds: [user?.id, participantId],
      });
      const newConversation = response.data;
      setConversations((prev) => [newConversation, ...prev]);
      await fetchMessages(newConversation._id);
      return newConversation;
    } catch (error) {
      console.error("Error starting conversation:", error);
      throw error;
    }
  };

  // Handle new messages in real-time
  useEffect(() => {
    if (!selectedConversation) return;

    const channel = pusherClient.subscribe(
      `conversation-${selectedConversation}`
    );
    channel.bind("new-message", (newMessage: Message) => {
      if (newMessage.conversationId === selectedConversation) {
        setCurrentMessages((prev) => [newMessage, ...prev]);
      }
    });

    return () => {
      channel.unbind("new-message");
      pusherClient.unsubscribe(`conversation-${selectedConversation}`);
    };
  }, [selectedConversation]);

  // Handle new conversations in real-time
  useEffect(() => {
    if (!user?.id) return;

    const channel = pusherClient.subscribe(`user-${user.id}`);
    channel.bind("new-conversation", (newConversation: Conversation) => {
      setConversations((prev) => [newConversation, ...prev]);
    });

    return () => {
      channel.unbind("new-conversation");
      pusherClient.unsubscribe(`user-${user.id}`);
    };
  }, [user?.id]);

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
