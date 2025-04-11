"use client";

import { useState, useEffect } from "react";
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
  const { specificProposal: proposals } = useProposals();
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

        {/* Content Area */}
        <div className="bg-white rounded-b-2xl shadow-sm min-h-[500px]">
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
        </div>
      </div>
    </div>
  );
}

export default MessagesAndProposals;
