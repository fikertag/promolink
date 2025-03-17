"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  Paperclip,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Clock3,
} from "lucide-react";

type TabType = "sent" | "received" | "messages";
type ProposalStatus = "pending" | "accepted" | "declined";

interface Proposal {
  id: string;
  brandName: string;
  brandLogo: string;
  campaignTitle: string;
  price: number;
  status: ProposalStatus;
  date: string;
  description?: string;
}

interface Message {
  id: string;
  brandName: string;
  brandLogo: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

function MessagesAndProposals() {
  const [activeTab, setActiveTab] = useState<TabType>("received");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");

  const proposalsSent: Proposal[] = [
    {
      id: "1",
      brandName: "EcoStyle",
      brandLogo:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100",
      campaignTitle: "Sustainable Fashion Campaign",
      price: 750,
      status: "pending",
      date: "2024-02-15",
    },
    {
      id: "2",
      brandName: "GreenLife",
      brandLogo:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100",
      campaignTitle: "Eco-Friendly Products",
      price: 500,
      status: "accepted",
      date: "2024-02-10",
    },
  ];

  const proposalsReceived: Proposal[] = [
    {
      id: "3",
      brandName: "Wellness Co",
      brandLogo:
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=100",
      campaignTitle: "Healthy Living Series",
      price: 800,
      status: "pending",
      date: "2024-02-18",
      description:
        "Looking for wellness influencers to promote our new product line",
    },
    {
      id: "4",
      brandName: "FitLife",
      brandLogo:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100",
      campaignTitle: "Fitness Challenge",
      price: 600,
      status: "pending",
      date: "2024-02-16",
      description: "30-day fitness transformation challenge campaign",
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      brandName: "EcoStyle",
      brandLogo:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100",
      lastMessage: "Looking forward to your response!",
      timestamp: "10:30 AM",
      unread: true,
    },
    {
      id: "2",
      brandName: "GreenLife",
      brandLogo:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100",
      lastMessage: "Great! Lets schedule a call.",
      timestamp: "Yesterday",
      unread: false,
    },
  ];

  const getStatusColor = (status: ProposalStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
    }
  };

  const getStatusIcon = (status: ProposalStatus) => {
    switch (status) {
      case "pending":
        return <Clock3 size={16} className="mr-1" />;
      case "accepted":
        return <CheckCircle size={16} className="mr-1" />;
      case "declined":
        return <XCircle size={16} className="mr-1" />;
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      setMessageInput("");
    }
  };

  return (
    <div className=" bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-t-2xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: "sent", label: "Proposals Sent" },
                { id: "received", label: "Proposals Received" },
                { id: "messages", label: "Messages" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`
                    flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm
                    ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                    transition-colors duration-200
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-b-2xl shadow-sm min-h-[500px]">
          {activeTab === "sent" && (
            <div className="p-6">
              <div className="space-y-4">
                {proposalsSent.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={proposal.brandLogo}
                        alt={proposal.brandName}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {proposal.brandName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {proposal.campaignTitle}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium text-gray-900">
                            ${proposal.price}
                          </span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">
                            {new Date(proposal.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          proposal.status
                        )}`}
                      >
                        {getStatusIcon(proposal.status)}
                        {proposal.status.charAt(0).toUpperCase() +
                          proposal.status.slice(1)}
                      </span>
                      <button className="text-primary hover:text-primary">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "received" && (
            <div className="p-6">
              <div className="space-y-4">
                {proposalsReceived.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="p-4 rounded-lg border border-gray-100 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <img
                          src={proposal.brandLogo}
                          alt={proposal.brandName}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {proposal.brandName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {proposal.campaignTitle}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          proposal.status
                        )}`}
                      >
                        {getStatusIcon(proposal.status)}
                        {proposal.status.charAt(0).toUpperCase() +
                          proposal.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {proposal.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          ${proposal.price}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                          {new Date(proposal.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          Decline
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary rounded-lg transition-colors">
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="grid grid-cols-3 min-h-[500px]">
              {/* Message Threads */}
              <div className="col-span-1 border-r border-gray-200">
                <div className="p-4">
                  {messages.map((thread) => (
                    <button
                      key={thread.id}
                      onClick={() => setSelectedChat(thread.id)}
                      className={`
                        w-full p-3 rounded-lg mb-2 text-left
                        ${
                          selectedChat === thread.id
                            ? "bg-primary/10"
                            : "hover:bg-gray-50"
                        }
                        transition-colors
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={thread.brandLogo}
                          alt={thread.brandName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 truncate">
                              {thread.brandName}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {thread.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {thread.lastMessage}
                          </p>
                        </div>
                        {thread.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Window */}
              <div className="col-span-2 flex flex-col">
                {selectedChat ? (
                  <>
                    <div className="flex-1 p-6">
                      {/* Chat messages would go here */}
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Paperclip size={20} />
                        </button>
                        <input
                          type="text"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                          onClick={handleSendMessage}
                          className="p-2 text-primary hover:text-primary transition-colors"
                        >
                          <Send size={20} />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <MessageSquare
                        size={48}
                        className="mx-auto mb-2 opacity-50"
                      />
                      <p>Select a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessagesAndProposals;
