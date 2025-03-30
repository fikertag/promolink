import { NextResponse, NextRequest } from "next/server";
import Proposal from "@/models/ProposalSchema"; // Import the Proposal model
import Job from "@/models/JobSchema"; // Import the Job model
import dbConnect from "@/lib/mongoose"; // Utility to connect to MongoDB
import { z } from "zod"; // For input validation
import mongoose from "mongoose"; // For ObjectId validation

// Define validation schema for POST request
const CreateProposalSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  influencerId: z.string().min(1, "Influencer ID is required"),
  message: z.string().min(1, "Message is required"),
});

// POST: Create a new proposal
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const validation = CreateProposalSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.error.errors },
        { status: 400 }
      );
    }

    const { jobId, influencerId, message } = validation.data;

    if (
      !mongoose.Types.ObjectId.isValid(jobId) ||
      !mongoose.Types.ObjectId.isValid(influencerId)
    ) {
      return NextResponse.json(
        { message: "Invalid Job ID or Influencer ID" },
        { status: 400 }
      );
    }

    // Verify job exists first
    const jobExists = await Job.exists({ _id: jobId });
    if (!jobExists) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // Create proposal
    const newProposal = new Proposal({
      jobId,
      influencerId,
      message,
    });

    const savedProposal = await newProposal.save();

    // Update job - make sure field name matches your schema exactly
    await Job.findByIdAndUpdate(
      jobId,
      { $push: { proposalsSubmitted: savedProposal._id } }, // Fixed field name
      { new: true }
    );

    return NextResponse.json(savedProposal, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Failed to create proposal", error },
      { status: 500 }
    );
  }
}

// GET: Fetch proposals (all or filtered by jobId or influencerId)
export async function GET(request: NextRequest) {
  await dbConnect(); // Ensure the database is connected

  try {
    const url = new URL(request.url);
    const jobId = url.searchParams.get("jobId");
    const influencerId = url.searchParams.get("influencerId");

    // Validate ObjectIds
    if (jobId && !mongoose.Types.ObjectId.isValid(jobId)) {
      return NextResponse.json({ message: "Invalid Job ID" }, { status: 400 });
    }
    if (influencerId && !mongoose.Types.ObjectId.isValid(influencerId)) {
      return NextResponse.json(
        { message: "Invalid Influencer ID" },
        { status: 400 }
      );
    }

    // Build the query
    const query: {
      jobId?: string;
      influencerId?: string;
    } = {};
    if (jobId) query.jobId = jobId;
    if (influencerId) query.influencerId = influencerId;

    const proposals = await Proposal.find(query)
      .populate({
        path: "jobId",
        select: "title description price location socialMedia status",
        model: Job,
      })
      .lean();

    return NextResponse.json(proposals, { status: 200 }); // Return the fetched proposals
  } catch (error) {
    console.error("Error fetching proposals:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to fetch proposals", error },
      { status: 500 }
    );
  }
}

/**
 * API Documentation:
 *
 * POST /api/proposal
 * - Description: Creates a new proposal for a job by an influencer.
 * - Request Body:
 *   {
 *     "jobId": "JobObjectId",
 *     "influencerId": "InfluencerObjectId",
 *     "message": "Proposal message"
 *   }
 * - Response:
 *   - 201: Returns the created proposal document.
 *   - 400: Returns validation errors or invalid ObjectId errors.
 *   - 500: Returns an error message if the creation fails.
 *
 * Example Request:
 * POST /api/proposal
 * Body:
 * {
 *   "jobId": "64f8c0e2b5d6c9a1f8e7b123",
 *   "influencerId": "67ddc27bac1483e290fd607b",
 *   "message": "I am interested in this job and have relevant experience."
 * }
 *
 * Example Response (201):
 * {
 *   "_id": "64f8c0e2b5d6c9a1f8e7b456",
 *   "jobId": "64f8c0e2b5d6c9a1f8e7b123",
 *   "influencerId": "67ddc27bac1483e290fd607b",
 *   "message": "I am interested in this job and have relevant experience.",
 *   "createdAt": "2023-09-01T12:00:00.000Z",
 *   "updatedAt": "2023-09-01T12:00:00.000Z"
 * }
 *
 * GET /api/proposal
 * - Description: Fetches proposals (all or filtered by jobId or influencerId).
 * - Query Parameters:
 *   - jobId: The ID of the job to filter proposals (optional).
 *   - influencerId: The ID of the influencer to filter proposals (optional).
 * - Response:
 *   - 200: Returns an array of proposal documents.
 *   - 400: Returns validation errors for invalid jobId or influencerId.
 *   - 500: Returns an error message if the fetch fails.
 *
 * Example Request:
 * GET /api/proposal?jobId=64f8c0e2b5d6c9a1f8e7b123
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
 *     "message": "I am interested in this job and have relevant experience.",
 *     "createdAt": "2023-09-01T12:00:00.000Z",
 *     "updatedAt": "2023-09-01T12:00:00.000Z"
 *   }
 * ]
 */
