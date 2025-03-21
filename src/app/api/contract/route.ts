import { NextResponse, NextRequest } from "next/server";
import Contract, { IContract } from "@/models/ContractSchema"; // Import the Contract model
import dbConnect from "@/lib/mongoose"; // Utility to connect to MongoDB
import { z } from "zod"; // For input validation
import mongoose from "mongoose"; // For ObjectId validation

// Define validation schema for POST request
const CreateContractSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  influencerId: z.string().min(1, "Influencer ID is required"),
  clientId: z.string().min(1, "Client ID is required"),
  terms: z.string().min(1, "Terms are required"),
});

// POST: Create a new contract (client sends a contract to an influencer)
export async function POST(request: NextRequest) {
  await dbConnect(); // Ensure the database is connected

  try {
    // Validate request body
    const body = await request.json();
    const validation = CreateContractSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.error.errors },
        { status: 400 }
      );
    }

    const { jobId, influencerId, clientId, terms } = validation.data;

    // Validate ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(jobId) ||
      !mongoose.Types.ObjectId.isValid(influencerId) ||
      !mongoose.Types.ObjectId.isValid(clientId)
    ) {
      return NextResponse.json(
        { message: "Invalid Job ID, Influencer ID, or Client ID" },
        { status: 400 }
      );
    }

    // Create a new contract
    const newContract: IContract = new Contract({
      jobId,
      influencerId,
      clientId,
      terms,
    });

    const savedContract = await newContract.save();
    return NextResponse.json(savedContract, { status: 201 }); // Return the created contract
  } catch (error) {
    console.error("Error creating contract:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to create contract", error },
      { status: 500 }
    );
  }
}

// GET: Fetch contracts for a specific user (client or influencer)
export async function GET(request: NextRequest) {
  await dbConnect(); // Ensure the database is connected

  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId"); // ID of the user fetching contracts
    const role = url.searchParams.get("role"); // "client" or "influencer"

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
    }

    // Validate role
    if (!role || (role !== "client" && role !== "influencer")) {
      return NextResponse.json(
        { message: "Invalid role. Must be 'client' or 'influencer'" },
        { status: 400 }
      );
    }

    // Build the query
    let query: any = {};
    if (role === "client") {
      query.clientId = userId; // Fetch contracts where the user is the client
    } else if (role === "influencer") {
      query.influencerId = userId; // Fetch contracts where the user is the influencer
    }

    // Fetch contracts
    const contracts = await Contract.find(query)
      //   .populate("jobId", "title description") // Populate job details
      //   .populate("influencerId", "name email") // Populate influencer details
      //   .populate("clientId", "name email") // Populate client details
      .sort({ createdAt: -1 }); // Sort by most recent first

    return NextResponse.json(contracts, { status: 200 }); // Return the fetched contracts
  } catch (error) {
    console.error("Error fetching contracts:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to fetch contracts", error },
      { status: 500 }
    );
  }
}

/**
 * API Documentation:
 *
 * POST /api/contract
 * - Description: Creates a new contract between a client and an influencer for a specific job.
 * - Request Body:
 *   {
 *     "jobId": "JobObjectId",
 *     "influencerId": "InfluencerObjectId",
 *     "clientId": "ClientObjectId",
 *     "terms": "Contract terms and conditions"
 *   }
 * - Response:
 *   - 201: Returns the created contract document.
 *   - 400: Returns validation errors or invalid ObjectId errors.
 *   - 500: Returns an error message if the creation fails.
 *
 * Example Request:
 * POST /api/contract
 * Body:
 * {
 *   "jobId": "64f8c0e2b5d6c9a1f8e7b123",
 *   "influencerId": "67ddc27bac1483e290fd607b",
 *   "clientId": "67ddc27bac1483e290fd607c",
 *   "terms": "The influencer agrees to promote the product on TikTok for 2 weeks."
 * }
 *
 * Example Response (201):
 * {
 *   "_id": "64f8c0e2b5d6c9a1f8e7b456",
 *   "jobId": "64f8c0e2b5d6c9a1f8e7b123",
 *   "influencerId": "67ddc27bac1483e290fd607b",
 *   "clientId": "67ddc27bac1483e290fd607c",
 *   "terms": "The influencer agrees to promote the product on TikTok for 2 weeks.",
 *   "createdAt": "2023-09-01T12:00:00.000Z",
 *   "updatedAt": "2023-09-01T12:00:00.000Z"
 * }
 *
 * GET /api/contract
 * - Description: Fetches contracts for a specific user (client or influencer).
 * - Query Parameters:
 *   - userId: The ID of the user fetching contracts (required).
 *   - role: The role of the user ("client" or "influencer") (required).
 * - Response:
 *   - 200: Returns an array of contract documents.
 *   - 400: Returns validation errors for invalid userId or role.
 *   - 500: Returns an error message if the fetch fails.
 *
 * Example Request:
 * GET /api/contract?userId=67ddc27bac1483e290fd607b&role=influencer
 *
 * Example Response (200):
 * [
 *   {
 *     "_id": "64f8c0e2b5d6c9a1f8e7b456",
 *     "jobId": {
 *       "_id": "64f8c0e2b5d6c9a1f8e7b123",
 *       "title": "Social Media Promoter Needed",
 *       "description": "Looking for someone to promote our product on TikTok and YouTube."
 *     },
 *     "influencerId": {
 *       "_id": "67ddc27bac1483e290fd607b",
 *       "name": "John Doe",
 *       "email": "john.doe@example.com"
 *     },
 *     "clientId": {
 *       "_id": "67ddc27bac1483e290fd607c",
 *       "name": "Jane Smith",
 *       "email": "jane.smith@example.com"
 *     },
 *     "terms": "The influencer agrees to promote the product on TikTok for 2 weeks.",
 *     "createdAt": "2023-09-01T12:00:00.000Z",
 *     "updatedAt": "2023-09-01T12:00:00.000Z"
 *   }
 * ]
 */
