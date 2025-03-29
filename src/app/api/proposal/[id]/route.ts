import { NextResponse, NextRequest } from "next/server";
import Proposal from "@/models/ProposalSchema"; // Import the Proposal model
import dbConnect from "@/lib/mongoose"; // Utility to connect to MongoDB
import { z } from "zod"; // For input validation
import mongoose from "mongoose"; // For ObjectId validation

// Define validation schema for PATCH request
const UpdateProposalSchema = z.object({
  status: z.enum(["pending", "accepted", "rejected"]).optional(), // Allowed statuses
  message: z.string().optional(), // Optional message update
});

// PATCH: Update a proposal (e.g., status or message)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  await dbConnect(); // Ensure the database is connected

  try {
    const { id: proposalId } = await params; // Access URL params

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
      { ...(status && { status }), ...(message && { message }) }, // Update only provided fields
      { new: true } // Return the updated document
    );
    // .populate("jobId", "title description") // Populate job details
    // .populate("influencerId", "name email"); // Populate influencer details

    if (!updatedProposal) {
      return NextResponse.json(
        { message: "Proposal not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProposal, { status: 200 }); // Return the updated proposal
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
  await dbConnect(); // Ensure the database is connected

  try {
    const { id: proposalId } = await params; // Access URL params

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

/**
 * API Documentation:
 *
 * PATCH /api/proposal/[id]
 * - Description: Updates a specific proposal (e.g., status or message).
 * - Route Parameter:
 *   - [id]: The ID of the proposal to update (must be a valid MongoDB ObjectId).
 * - Request Body:
 *   {
 *     "status": "accepted", // Allowed values: "pending", "accepted", "rejected" (optional)
 *     "message": "Updated proposal message" // Optional
 *   }
 * - Response:
 *   - 200: Returns the updated proposal document.
 *   - 400: Returns validation errors for invalid proposal ID or request body.
 *   - 404: Returns an error message if the proposal is not found.
 *   - 500: Returns an error message if the update fails.
 *
 * Example Request:
 * PATCH /api/proposal/64f8c0e2b5d6c9a1f8e7b123
 * Body:
 * {
 *   "status": "accepted",
 *   "message": "I am excited to work on this project!"
 * }
 *
 * Example Response (200):
 * {
 *   "_id": "64f8c0e2b5d6c9a1f8e7b123",
 *   "jobId": {
 *     "_id": "64f8c0e2b5d6c9a1f8e7b456",
 *     "title": "Social Media Promoter Needed",
 *     "description": "Looking for someone to promote our product on TikTok and YouTube."
 *   },
 *   "influencerId": {
 *     "_id": "67ddc27bac1483e290fd607b",
 *     "name": "John Doe",
 *     "email": "john.doe@example.com"
 *   },
 *   "status": "accepted",
 *   "message": "I am excited to work on this project!",
 *   "createdAt": "2023-09-01T12:00:00.000Z",
 *   "updatedAt": "2023-09-01T12:00:00.000Z"
 * }
 *
 * DELETE /api/proposal/[id]
 * - Description: Deletes a specific proposal.
 * - Route Parameter:
 *   - [id]: The ID of the proposal to delete (must be a valid MongoDB ObjectId).
 * - Response:
 *   - 200: Returns a success message and the deleted proposal document.
 *   - 400: Returns validation errors for invalid proposal ID.
 *   - 404: Returns an error message if the proposal is not found.
 *   - 500: Returns an error message if the deletion fails.
 *
 * Example Request:
 * DELETE /api/proposal/64f8c0e2b5d6c9a1f8e7b123
 *
 * Example Response (200):
 * {
 *   "message": "Proposal deleted successfully",
 *   "proposal": {
 *     "_id": "64f8c0e2b5d6c9a1f8e7b123",
 *     "jobId": "64f8c0e2b5d6c9a1f8e7b456",
 *     "influencerId": "67ddc27bac1483e290fd607b",
 *     "status": "pending",
 *     "message": "I am interested in this job and have relevant experience.",
 *     "createdAt": "2023-09-01T12:00:00.000Z",
 *     "updatedAt": "2023-09-01T12:00:00.000Z"
 *   }
 * }
 */
