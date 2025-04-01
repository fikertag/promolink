"use client";

import { useContracts } from "@/context/Contract";
import { useState, useEffect } from "react";
import { Clipboard, CheckCircle, XCircle, Clock, FileText } from "lucide-react";

export default function ContractsPage() {
  const { contracts, updateContractStatus } = useContracts();
  const [activeTab, setActiveTab] = useState<
    "draft" | "active" | "completed" | "terminated"
  >("active");
  // const [isLoading, setIsLoading] = useState(false);

  const isLoading = false;

  useEffect(() => {
    console.log("Contracts:", contracts);
  }, [contracts]);

  const filteredContracts = contracts.filter(
    (contract) => contract.status === activeTab
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle size={16} className="text-green-500" />;
      case "completed":
        return <FileText size={16} className="text-blue-500" />;
      case "terminated":
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-yellow-500" />;
    }
  };

  const handleStatusUpdate = async (
    contractId: string,
    newStatus: typeof activeTab
  ) => {
    await updateContractStatus(contractId, newStatus);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Clipboard size={24} />
        Contract Management
      </h1>

      {/* Status Tabs */}
      <div className="flex border-b mb-6">
        {(["active", "draft", "completed", "terminated"] as const).map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredContracts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FileText size={48} className="mx-auto mb-4 opacity-50" />
          <p>No {activeTab} contracts found</p>
        </div>
      )}

      {/* Contract List */}
      {!isLoading && filteredContracts.length > 0 && (
        <div className="grid gap-4">
          {filteredContracts.map((contract) => (
            <div
              key={contract._id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">
                    Contract #{contract._id.slice(-6)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Deadline: {formatDate(contract.deadline)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(contract.status)}
                  <span className="text-sm capitalize">{contract.status}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Deliverables</h4>
                  <ul className="space-y-1">
                    {contract.socialMediaActions.map((action, index) => (
                      <li key={index} className="text-sm">
                        {action.quantity}x {action.platform} {action.actionType}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Financials</h4>
                  <p className="text-lg font-bold">${contract.price}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Created: {formatDate(contract.createdAt)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                {contract.status === "draft" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(contract._id, "active")}
                      className="px-3 py-1 bg-green-500 text-white text-sm rounded"
                    >
                      Activate
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(contract._id, "terminated")
                      }
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded"
                    >
                      Terminate
                    </button>
                  </>
                )}

                {contract.status === "active" && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusUpdate(contract._id, "completed")
                      }
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded"
                    >
                      Mark Completed
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(contract._id, "terminated")
                      }
                      className="px-3 py-1 bg-gray-500 text-white text-sm rounded"
                    >
                      Terminate
                    </button>
                  </>
                )}

                {contract.status === "completed" && (
                  <span className="text-sm text-green-600 flex items-center">
                    <CheckCircle size={16} className="mr-1" />
                    Contract fulfilled
                  </span>
                )}

                {contract.status === "terminated" && (
                  <span className="text-sm text-red-600 flex items-center">
                    <XCircle size={16} className="mr-1" />
                    Contract terminated
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
