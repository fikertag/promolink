import { NextResponse, NextRequest } from "next/server";
import Job, { IJob } from "@/models/JobSchema"; // Adjust the path as needed
import dbConnect from "@/lib/mongoose"; // Utility to connect to MongoDB
import mongoose from "mongoose"; // For ObjectId validation
import Proposal from "@/models/ProposalSchema"; // Adjust the path as needed
import { completeJob } from "@/lib/jobService";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const {
      title,
      description,
      price,
      location,
      socialMedia,
      postedBy,
      statusInPercent,
      goalId,
      goalContributionPercent,
    } = await request.json();

    if (!postedBy || !mongoose.Types.ObjectId.isValid(postedBy)) {
      return NextResponse.json(
        { message: "Invalid postedBy" },
        { status: 400 }
      );
    }

    // validate optional numeric fields
    if (statusInPercent !== undefined) {
      const n = Number(statusInPercent);
      if (!Number.isFinite(n) || n < 0 || n > 100) {
        return NextResponse.json(
          { message: "Invalid statusInPercent" },
          { status: 400 }
        );
      }
    }

    if (goalContributionPercent !== undefined) {
      const g = Number(goalContributionPercent);
      if (!Number.isFinite(g) || g < 0 || g > 100) {
        return NextResponse.json(
          { message: "Invalid goalContributionPercent" },
          { status: 400 }
        );
      }
    }

    if (
      goalId !== undefined &&
      goalId !== null &&
      !mongoose.Types.ObjectId.isValid(goalId)
    ) {
      return NextResponse.json({ message: "Invalid goalId" }, { status: 400 });
    }

    const newJob: IJob = new Job({
      title,
      description,
      price,
      location,
      socialMedia,
      postedBy: new mongoose.Types.ObjectId(postedBy),
      ...(statusInPercent !== undefined
        ? { statusInPercent: Number(statusInPercent) }
        : {}),
      ...(goalId ? { goalId: new mongoose.Types.ObjectId(goalId) } : {}),
      ...(goalContributionPercent !== undefined
        ? { goalContributionPercent: Number(goalContributionPercent) }
        : {}),
    });

    const savedJob = await newJob.save();
    return NextResponse.json(savedJob, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create job", error },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const url = new URL(request.url);
    const excludeCompleted = url.searchParams.get("excludeCompleted");

    let query = {};
    if (excludeCompleted === "true") {
      query = { status: { $ne: "completed" } };
    }

    const jobs = await Job.find(query)
      .populate({
        path: "proposalsSubmitted",
        select: "influencerId", // Get the influencerId from proposals
        model: Proposal, // Explicitly reference the model name as a string
      })
      .lean(); // Convert to plain JavaScript objects

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Failed to fetch jobs", error: error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  await dbConnect();

  try {
    const { jobId, status } = await request.json();

    // Validate input
    if (!jobId) {
      return NextResponse.json(
        { message: "Job ID is required" },
        { status: 400 }
      );
    }

    // Load existing job to know previous status
    const existingJob = await Job.findById(jobId);
    if (!existingJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    const previousStatus = existingJob.status;

    // Update status if provided
    let updatedJob = existingJob;
    if (status) {
      updatedJob = await Job.findByIdAndUpdate(
        jobId,
        { status },
        { new: true }
      );
    }

    // If the new status is completed and it wasn't completed before, run completeJob
    if (status === "completed" && previousStatus !== "completed") {
      try {
        const completed = await completeJob(jobId);
        console.log(
          "Job completed and post-completion tasks executed:",
          completed._id
        );
        return NextResponse.json(completed, { status: 200 });
      } catch (err) {
        console.error("Error during completeJob:", err);
        return NextResponse.json(
          {
            message: "Job updated but post-completion processing failed",
            error: String(err),
          },
          { status: 500 }
        );
      }
    }

    console.log("Updated job:", updatedJob); // Log the updated job for debugging

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update job", error },
      { status: 500 }
    );
  }
}

/**
 * API Documentation:
 *
 * POST /api/job
 * - Description: Creates a new job in the database.
 * - Request Body:
 *   {
 *     "title": "Job Title",
 *     "description": "Job Description",
 *     "price": 100,
 *     "location": "City Name",
 *     "socialMedia": [{ "platform": "tiktok" }, { "platform": "youtube" }],
 *     "postedBy": "UserObjectId"
 *   }
 * - Response:
 *   - 201: Returns the created job document.
 *   - 500: Returns an error message if the creation fails.
 *
 *
 *
 * GET /api/job
 * - Description: Fetches all jobs or filters out completed jobs based on query parameters.
 * - Query Parameters:
 *   - excludeCompleted=true (optional): Excludes jobs with the status "completed".
 * - Response:
 *   - 200: Returns an array of job documents.
 *   - 500: Returns an error message if the fetch fails.
 *
 *
 *
 * PATCH /api/job
 * - Description: Updates the status of a job in the database.
 * - Request Body:
 *   {
 *     "jobId": "JobObjectId",
 *     "status": "completed"
 *   }
 * - Response:
 *   - 200: Returns the updated job document.
 *   - 400: Returns an error message if the jobId is missing.
 *   - 404: Returns an error message if the job is not found.
 *   - 500: Returns an error message if the update fails.
 */
