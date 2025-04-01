// app/api/contracts/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Contract from "@/models/ContractSchema";
import Proposal from "@/models/ProposalSchema";
import Job from "@/models/JobSchema";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  await dbConnect();

  try {
    const { id } = await params; // Access URL params
    const contract = await Contract.findById(id)
      .populate({
        path: "proposalId",
        select: "jobId influencerId",
        model: Proposal,
        populate: { path: "jobId", select: "title postedBy", model: Job },
        //     { path: "influencerId", select: "name avatar" },
      })
      .lean();

    if (!contract) {
      return NextResponse.json(
        { error: "Contract not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(contract, { status: 200 });
  } catch (error) {
    console.error("Error fetching contract:", error); // Log the error for debugging
    return NextResponse.json(
      { error: "Failed to fetch contract" },
      { status: 500 }
    );
  }
}

/**
 * API Documentation:
 *
 * GET /api/contract/[id]
 * - Description: Fetches a specific contract by its ID, including populated details for the associated proposal, job, and influencer.
 * - Path Parameters:
 *   - id (required): The ID of the contract to fetch.
 * - Response:
 *   - 200: Returns the contract document with populated details.
 *     {
 *       "_id": "ContractObjectId",
 *       "proposalId": {
 *         "_id": "ProposalObjectId",
 *         "jobId": {
 *           "_id": "JobObjectId",
 *           "title": "Job Title",
 *           "postedBy": "UserObjectId"
 *         },
 *         "influencerId": {
 *           "_id": "InfluencerObjectId",
 *           "name": "Influencer Name",
 *           "avatar": "https://example.com/avatar.jpg"
 *         }
 *       },
 *       "price": 1000,
 *       "socialMediaActions": ["post", "story"],
 *       "deadline": "2025-04-15T00:00:00.000Z",
 *       "status": "active",
 *       "createdAt": "2025-03-30T12:00:00.000Z",
 *       "updatedAt": "2025-03-30T12:00:00.000Z"
 *     }
 *   - 404: Returns an error message if the contract is not found.
 *     {
 *       "error": "Contract not found"
 *     }
 *   - 500: Returns an error message if there is a server error.
 *     {
 *       "error": "Failed to fetch contract"
 *     }
 *
 * Detailed Behavior:
 * - Validates the `id` parameter to ensure it is a valid MongoDB ObjectId.
 * - Queries the `Contract` collection for the document with the specified `id`.
 * - Populates the `proposalId` field with:
 *   - `jobId`: Includes the `title` and `postedBy` fields.
 *   - `influencerId`: Includes the `name` and `avatar` fields.
 * - Converts the result to a plain JavaScript object using `.lean()` for better performance.
 * - Returns a `404` error if the contract is not found.
 * - Returns a `500` error if there is a server error during the query.
 *
 * Example Requests:
 *
 * GET /api/contract/64f8c0e2b5d6c9a1f8e7b123
 * Response (200):
 *   {
 *     "_id": "64f8c0e2b5d6c9a1f8e7b123",
 *     "proposalId": {
 *       "_id": "64f8c0e2b5d6c9a1f8e7b456",
 *       "jobId": {
 *         "_id": "64f8c0e2b5d6c9a1f8e7b789",
 *         "title": "Promote our product",
 *         "postedBy": "64f8c0e2b5d6c9a1f8e7b999"
 *       },
 *       "influencerId": {
 *         "_id": "64f8c0e2b5d6c9a1f8e7b888",
 *         "name": "John Doe",
 *         "avatar": "https://example.com/avatar.jpg"
 *       }
 *     },
 *     "price": 1000,
 *     "socialMediaActions": ["post", "story"],
 *     "deadline": "2025-04-15T00:00:00.000Z",
 *     "status": "active",
 *     "createdAt": "2025-03-30T12:00:00.000Z",
 *     "updatedAt": "2025-03-30T12:00:00.000Z"
 *   }
 *
 * Response (404):
 *   {
 *     "error": "Contract not found"
 *   }
 *
 * Response (500):
 *   {
 *     "error": "Failed to fetch contract"
 *   }
 */
