"use client";

import React, { useState, useEffect } from "react";
import { useProposals } from "@/context/Proposal";
import { useMessages } from "@/context/Message";
import { useUser } from "@/context/User";
import Image from "next/image";
import {
  MessageSquare,
  Send,
  Clipboard,
  CheckCircle,
  MessageCircle,
  XCircle,
  Clock3,
  DollarSign,
  MapPin,
  Calendar,
  FileText,
  User,
  ChevronLeft,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TabType = "sent" | "received" | "messages";
type ProposalStatus = "pending" | "accepted" | "rejected";

function MessagesAndProposals() {
  const [activeTab, setActiveTab] = useState<TabType>("received");
  const [messageInput, setMessageInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);
  const { proposals } = useProposals();
  const {
    conversations,
    currentMessages,
    selectedConversation,
    fetchMessages,
    sendMessage,
    fetchConversations,
  } = useMessages();

  const { user } = useUser();

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

  const handleSendMessage = async () => {
    if (messageInput.trim() && selectedConversation) {
      setIsSending(true);
      try {
        await sendMessage(messageInput);
        setMessageInput("");
      } finally {
        setIsSending(false);
      }
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSelectConversation = (convoId: string) => {
    fetchMessages(convoId);
    setShowConversationList(false);
  };

  const handleBackToConversations = () => {
    setShowConversationList(true);
  };

  useEffect(() => {
    if (activeTab === "messages") {
      fetchConversations();
      // Reset conversation view on tab change
      setShowConversationList(true);
    }
  }, [activeTab]);

  return (
    <div className=" py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-t-2xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: "received", label: "Proposals" },
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
          {activeTab === "received" && (
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

          {activeTab === "messages" && (
            <div className="grid lg:grid-cols-3 grid-cols-1 min-h-[500px]">
              {/* Conversation List - Always visible on desktop, conditionally on mobile */}
              <div
                className={`col-span-1 border-r border-gray-200 bg-white ${
                  !showConversationList ? "hidden lg:block" : "block"
                }`}
              >
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Conversations
                  </h2>
                  {conversations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare size={24} className="mx-auto mb-2" />
                      <p>No conversations yet</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {conversations.map((convo) => (
                        <button
                          key={convo._id}
                          onClick={() => handleSelectConversation(convo._id)}
                          className={`
                            w-full p-3 rounded-lg transition-colors
                            ${
                              selectedConversation === convo._id
                                ? "bg-gray-100 shadow-sm border border-gray-200"
                                : "hover:bg-gray-100"
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                {convo.otherUser.image ? (
                                  <Image
                                    src={convo.otherUser.image}
                                    alt={convo.otherUser.name}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                  />
                                ) : (
                                  <User size={20} className="text-gray-500" />
                                )}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-gray-900 truncate">
                                  {convo.otherUser.name}
                                </h3>
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                  {formatTime(convo.updatedAt)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 truncate">
                                {convo.lastMessage}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Window - Conditionally shown on mobile */}
              <div
                className={`col-span-2 flex flex-col bg-white ${
                  showConversationList ? "hidden lg:flex" : "flex"
                }`}
              >
                {selectedConversation ? (
                  <>
                    {/* Chat Header with back button on mobile */}
                    <div className="border-b border-gray-200 px-1 py-2 flex items-center">
                      <button
                        onClick={handleBackToConversations}
                        className="lg:hidden p-1 mr-1 text-gray-500 hover:text-gray-700"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {conversations.find(
                          (c) => c._id === selectedConversation
                        )?.otherUser.image ? (
                          <Image
                            src={
                              conversations.find(
                                (c) => c._id === selectedConversation
                              )!.otherUser.image
                            }
                            alt={
                              conversations.find(
                                (c) => c._id === selectedConversation
                              )!.otherUser.name
                            }
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        ) : (
                          <User size={20} className="text-gray-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 ml-2">
                          {
                            conversations.find(
                              (c) => c._id === selectedConversation
                            )?.otherUser.name
                          }
                        </h3>
                      </div>
                    </div>

                    {/* Scrollable Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 max-h-[calc(100vh-300px)]">
                      {currentMessages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                          <MessageSquare
                            size={48}
                            className="mb-4 opacity-50"
                          />
                          <p>No messages yet</p>
                          <p className="text-sm">Start the conversation</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {[...currentMessages].reverse().map((message) => (
                            <div
                              key={message._id}
                              className={`flex ${
                                message.senderId === user?.id
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                            >
                              <div
                                className={`max-w-xs lg:max-w-md min-w-30 px-3 py-1 rounded-lg relative ${
                                  message.senderId === user?.id
                                    ? "bg-primary text-white rounded-br-none"
                                    : "bg-white border border-gray-200 rounded-bl-none"
                                } shadow-sm`}
                              >
                                <p>{message.content}</p>
                                <p
                                  className={`text-xs mt-1 text-right ${
                                    message.senderId === user?.id
                                      ? "text-primary-100"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {formatTime(message.createdAt)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-gray-200 p-4 bg-white">
                      <div className="flex items-center gap-2">
                        {/* <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Paperclip size={20} />
                        </button> */}
                        <input
                          type="text"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSendMessage();
                          }}
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                          onClick={handleSendMessage}
                          disabled={!messageInput.trim() || isSending}
                          className={`p-2 rounded-full ${
                            messageInput.trim()
                              ? " text-white hover:bg-primary-dark"
                              : " text-gray-400"
                          } transition-colors min-w-[40px] flex items-center justify-center`}
                        >
                          {isSending ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                          ) : (
                            <Send
                              size={20}
                              className={`${
                                messageInput.trim()
                                  ? "text-primary"
                                  : " text-gray-400"
                              }`}
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50">
                    <div className="text-center">
                      <MessageSquare
                        size={48}
                        className="mx-auto mb-4 opacity-50"
                      />
                      <h3 className="text-lg font-medium mb-1">
                        No conversation selected
                      </h3>
                      <p className="text-sm">
                        Select a conversation or start a new one
                      </p>
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
