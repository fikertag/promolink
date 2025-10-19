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
      {
        $push: {
          proposalsSubmitted: {
            proposal: savedProposal._id,
            influencer: influencerId,
          },
        },
      },
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
