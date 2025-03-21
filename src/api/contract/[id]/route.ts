import { NextResponse, NextRequest } from "next/server";
import Contract from "@/models/ContractSchema"; // Adjust the path as needed
import dbConnect from "@/lib/mongoose"; // Utility to connect to MongoDB
import { z } from "zod"; // For input validation
import mongoose from "mongoose"; // For ObjectId validation

// Define validation schema for PATCH request
const UpdateContractSchema = z.object({
  status: z.enum(["pending", "accepted", "declined"]),
});

// PATCH: Update the contract status (influencer accepts or declines)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const { id: contractId } = params; // Access URL params

    // Validate contractId
    if (!contractId || !mongoose.Types.ObjectId.isValid(contractId)) {
      return NextResponse.json(
        { message: "Invalid Contract ID" },
        { status: 400 }
      );
    }

    // Validate request body
    const body = await request.json();
    const validation = UpdateContractSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.error.errors },
        { status: 400 }
      );
    }

    const { status } = validation.data;

    // Update the contract status
    const updatedContract = await Contract.findByIdAndUpdate(
      contractId,
      { status },
      { new: true } // Return the updated document
    )
      .populate("jobId", "title description") // Populate job details
      .populate("influencerId", "name email") // Populate influencer details
      .populate("clientId", "name email"); // Populate client details

    if (!updatedContract) {
      return NextResponse.json(
        { message: "Contract not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedContract, { status: 200 });
  } catch (error) {
    console.error("Error updating contract:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to update contract", error },
      { status: 500 }
    );
  }
}
