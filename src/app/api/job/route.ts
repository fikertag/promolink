import { NextResponse, NextRequest } from "next/server";
import Job, { IJob } from "@/models/JobSchema"; // Adjust the path as needed
import dbConnect from "@/lib/mongoose"; // Utility to connect to MongoDB
import mongoose from "mongoose"; // For ObjectId validation
import Proposal from "@/models/ProposalSchema"; // Adjust the path as needed

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { title, description, price, location, socialMedia, postedBy } =
      await request.json();

    if (!postedBy || !mongoose.Types.ObjectId.isValid(postedBy)) {
      return NextResponse.json({ message: "Invalid Job ID" }, { status: 400 });
    }

    const newJob: IJob = new Job({
      title,
      description,
      price,
      location,
      socialMedia,
      postedBy,
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

    // Update the job
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { ...(status && { status }) },
      { new: true } // Return the updated document
    ); // Populate not working

    if (!updatedJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
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
