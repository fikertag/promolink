"use client";

import React, { useState } from "react";
import { useProposals } from "@/context/Proposal";
import {
  MessageSquare,
  Send,
  Paperclip,
  Clipboard,
  CheckCircle,
  MessageCircle,
  XCircle,
  Clock3,
  DollarSign,
  MapPin,
  Calendar,
  FileText,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TabType = "sent" | "received" | "messages";
type ProposalStatus = "pending" | "accepted" | "rejected";

// interface Proposal {
//   id: string;
//   brandName: string;
//   brandLogo: string;
//   campaignTitle: string;
//   price: number;
//   status: ProposalStatus;
//   date: string;
//   description?: string;
// }

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
  const { proposals } = useProposals();

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
      case "rejected":
        return "bg-red-100 text-red-800";
    }
  };

  const getStatusIcon = (status: ProposalStatus) => {
    switch (status) {
      case "pending":
        return <Clock3 size={16} className="sm:mr-1" />;
      case "accepted":
        return <CheckCircle size={16} className="sm:mr-1" />;
      case "rejected":
        return <XCircle size={16} className="sm:mr-1" />;
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      setMessageInput("");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-t-2xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: "sent", label: "Proposals" },
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
            <div className="p-3 sm:p-6">
              {proposals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <FileText size={48} className="mb-4 opacity-50" />
                  <p className="text-lg">No proposals yet</p>
                  <p className="text-sm">Your proposals will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <div
                      key={proposal._id}
                      className="px-2 sm:px-6 rounded-lg border border-gray-400 hover:shadow-sm transition-all"
                    >
                      <div className="flex flex-col">
                        <Accordion type="single" collapsible>
                          <AccordionItem value="item-1">
                            <AccordionTrigger>
                              {/* Header with title and status */}
                              <div className="flex flex-col w-full">
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h3 className="sm:text-lg font-semibold text-[18px] text-gray-900 flex items-center">
                                      <Clipboard
                                        size={18}
                                        className="mr-2 text-gray-400"
                                      />
                                      {proposal.jobId.title}
                                    </h3>
                                  </div>
                                  <span
                                    className={` ml-2 inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border ${getStatusColor(
                                      proposal.status
                                    )}`}
                                  >
                                    {getStatusIcon(proposal.status)}
                                    <span className="hidden sm:inline-flex">
                                      {proposal.status.charAt(0).toUpperCase() +
                                        proposal.status.slice(1)}
                                    </span>
                                  </span>
                                </div>

                                {/* Key details in compact grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-4 gap-2 mb-4">
                                  <div className="flex items-center text-sm">
                                    <DollarSign
                                      size={16}
                                      className="mr-2 text-gray-400 flex-shrink-0"
                                    />
                                    <div>
                                      <span className="text-gray-500">
                                        Budget
                                      </span>
                                      <p className="font-medium">
                                        ${proposal.jobId.price}
                                      </p>
                                    </div>
                                  </div>

                                  {proposal.jobId.location && (
                                    <div className="flex items-center text-sm">
                                      <MapPin
                                        size={16}
                                        className="mr-2 text-gray-400 flex-shrink-0"
                                      />
                                      <div>
                                        <span className="text-gray-500">
                                          Location
                                        </span>
                                        <p className="font-medium">
                                          {proposal.jobId.location}
                                        </p>
                                      </div>
                                    </div>
                                  )}

                                  <div className="flex items-center text-sm">
                                    <Calendar
                                      size={16}
                                      className="mr-2 text-gray-400 flex-shrink-0"
                                    />
                                    <div>
                                      <span className="text-gray-500">
                                        Submitted
                                      </span>
                                      <p className="font-medium">
                                        {formatDate(proposal.createdAt)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              {/* Job description */}
                              <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                  <FileText
                                    size={16}
                                    className="mr-2 text-gray-400"
                                  />
                                  Job Description
                                </h4>
                                <p className="text-sm text-gray-600 pl-6">
                                  {proposal.jobId.description}
                                </p>
                              </div>

                              {/* Your proposal message */}
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                  <MessageCircle
                                    size={16}
                                    className="mr-2 text-gray-400"
                                  />
                                  Your Proposal
                                </h4>
                                <p className="text-sm text-gray-600 pl-6">
                                  {proposal.message}
                                </p>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Messages section remains unchanged */}
          {activeTab === "messages" && (
            <div className="grid lg:grid-cols-3 grid-cols-1 min-h-[500px]">
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
                  <div className="flex-1 sm:flex hidden items-center justify-center text-gray-500">
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
