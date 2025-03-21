import { NextResponse, NextRequest } from "next/server";
import Proposal, { IProposal } from "@/models/ProposalSchema"; // Adjust the path as needed
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
    // Validate request body
    const body = await request.json();
    const validation = CreateProposalSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.error.errors },
        { status: 400 }
      );
    }

    const { jobId, influencerId, message } = validation.data;

    // Validate ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(jobId) ||
      !mongoose.Types.ObjectId.isValid(influencerId)
    ) {
      return NextResponse.json(
        { message: "Invalid Job ID or Influencer ID" },
        { status: 400 }
      );
    }

    // Create a new proposal
    const newProposal: IProposal = new Proposal({
      jobId,
      influencerId,
      message,
    });

    const savedProposal = await newProposal.save();
    return NextResponse.json(savedProposal, { status: 201 });
  } catch (error) {
    console.error("Error creating proposal:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to create proposal", error },
      { status: 500 }
    );
  }
}

// GET: Fetch proposals (all or filtered by jobId or influencerId)
export async function GET(request: NextRequest) {
  await dbConnect();

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
    let query: any = {};
    if (jobId) query.jobId = jobId;
    if (influencerId) query.influencerId = influencerId;

    // Fetch proposals
    const proposals = await Proposal.find(query)
      .populate("jobId", "title description")
      .populate("influencerId", "name email");

    return NextResponse.json(proposals, { status: 200 });
  } catch (error) {
    console.error("Error fetching proposals:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to fetch proposals", error },
      { status: 500 }
    );
  }
}
