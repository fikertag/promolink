import { NextResponse, NextRequest } from "next/server";
import Proposal from "@/models/ProposalSchema"; // Adjust the path as needed
import dbConnect from "@/lib/mongoose"; // Utility to connect to MongoDB
import { z } from "zod"; // For input validation
import mongoose from "mongoose"; // For ObjectId validation

// Define validation schema for PATCH request
const UpdateProposalSchema = z.object({
  status: z.enum(["pending", "accepted", "rejected"]).optional(),
  message: z.string().optional(),
});

// PATCH: Update a proposal (e.g., status or message)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const { id: proposalId } = params; // Access URL params

    // Validate proposalId
    if (!proposalId || !mongoose.Types.ObjectId.isValid(proposalId)) {
      return NextResponse.json(
        { message: "Invalid Proposal ID" },
        { status: 400 }
      );
    }

    // Validate request body
    const body = await request.json();
    const validation = UpdateProposalSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.error.errors },
        { status: 400 }
      );
    }

    const { status, message } = validation.data;

    // Update the proposal
    const updatedProposal = await Proposal.findByIdAndUpdate(
      proposalId,
      { ...(status && { status }), ...(message && { message }) },
      { new: true } // Return the updated document
    )
      .populate("jobId", "title description")
      .populate("influencerId", "name email");

    if (!updatedProposal) {
      return NextResponse.json(
        { message: "Proposal not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProposal, { status: 200 });
  } catch (error) {
    console.error("Error updating proposal:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to update proposal", error },
      { status: 500 }
    );
  }
}

// DELETE: Delete a proposal
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const { id: proposalId } = params; // Access URL params

    // Validate proposalId
    if (!proposalId || !mongoose.Types.ObjectId.isValid(proposalId)) {
      return NextResponse.json(
        { message: "Invalid Proposal ID" },
        { status: 400 }
      );
    }

    // Delete the proposal
    const deletedProposal = await Proposal.findByIdAndDelete(proposalId);

    if (!deletedProposal) {
      return NextResponse.json(
        { message: "Proposal not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Proposal deleted successfully", proposal: deletedProposal },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting proposal:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to delete proposal", error },
      { status: 500 }
    );
  }
}
