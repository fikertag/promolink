import { NextResponse, NextRequest } from "next/server";
import Contract from "@/models/ContractSchema"; // Import the Contract model
import dbConnect from "@/lib/mongoose"; // Utility to connect to MongoDB
import { z } from "zod"; // For input validation
import mongoose from "mongoose"; // For ObjectId validation

// Define validation schema for PATCH request
const UpdateContractSchema = z.object({
  status: z.enum(["pending", "accepted", "declined"]), // Allowed statuses
});

// PATCH: Update the contract status (influencer accepts or declines)
export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect(); // Ensure the database is connected

  try {
    const { id: contractId } = await context.params; // Access URL params

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
      { status }, // Update the status field
      { new: true } // Return the updated document
    );
    // .populate("jobId", "title description") // Populate job details
    // .populate("influencerId", "name email") // Populate influencer details
    // .populate("clientId", "name email"); // Populate client details

    // If the contract is not found, return a 404 status
    if (!updatedContract) {
      return NextResponse.json(
        { message: "Contract not found" },
        { status: 404 }
      );
    }

    // Return the updated contract with a 200 status
    return NextResponse.json(updatedContract, { status: 200 });
  } catch (error) {
    console.error("Error updating contract:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to update contract", error },
      { status: 500 }
    );
  }
}

/**
 * API Documentation:
 *
 * PATCH /api/contract/[id]
 * - Description: Updates the status of a specific contract (e.g., influencer accepts or declines the contract).
 * - Route Parameter:
 *   - [id]: The ID of the contract to update (must be a valid MongoDB ObjectId).
 * - Request Body:
 *   {
 *     "status": "accepted" // Allowed values: "pending", "accepted", "declined"
 *   }
 * - Response:
 *   - 200: Returns the updated contract document.
 *   - 400: Returns validation errors for invalid contract ID or request body.
 *   - 404: Returns an error message if the contract is not found.
 *   - 500: Returns an error message if the update fails.
 *
 * Example Request:
 * PATCH /api/contract/64f8c0e2b5d6c9a1f8e7b123
 * Body:
 * {
 *   "status": "accepted"
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
 *   "clientId": {
 *     "_id": "67ddc27bac1483e290fd607c",
 *     "name": "Jane Smith",
 *     "email": "jane.smith@example.com"
 *   },
 *   "status": "accepted",
 *   "createdAt": "2023-09-01T12:00:00.000Z",
 *   "updatedAt": "2023-09-01T12:00:00.000Z"
 * }
 */
