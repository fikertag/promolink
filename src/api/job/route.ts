import { NextResponse, NextRequest } from "next/server";
import Job, { IJob } from "@/models/JobSchema"; // Adjust the path as needed
import dbConnect from "@/lib/mongoose"; // Utility to connect to MongoDB

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { title, description, price, location, socialMedia, postedBy } =
      await request.json();

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
      query = { status: { $ne: "completed" } }; // Exclude jobs with status "completed"
    }

    const jobs = await Job.find(query).populate("postedBy", "name email"); // Populate postedBy with name and email
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch jobs", error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  await dbConnect();

  try {
    const { jobId, status, postedBy } = await request.json();

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
      { ...(status && { status }), ...(postedBy && { postedBy }) },
      { new: true } // Return the updated document
    ).populate("postedBy", "name email"); // Populate postedBy with name and email

    if (!updatedJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update job", error },
      { status: 500 }
    );
  }
}
