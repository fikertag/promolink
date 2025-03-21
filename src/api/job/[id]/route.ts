import { NextResponse, NextRequest } from "next/server";
import Job from "@/models/JobSchema"; // Adjust the path as needed
import dbConnect from "@/lib/mongoose"; // Utility to connect to MongoDB

export async function DELETE(request: NextRequest) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const jobId = url.searchParams.get("jobId");

    // Validate input
    if (!jobId) {
      return NextResponse.json(
        { message: "Job ID is required" },
        { status: 400 }
      );
    }

    // Delete the job
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Job deleted successfully", job: deletedJob },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete job", error },
      { status: 500 }
    );
  }
}
