import { NextResponse, NextRequest } from "next/server";
import Job from "@/models/JobSchema";
import dbConnect from "@/lib/mongoose";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const savedJobs = session.user.savedJobs || [];

    const jobs = await Job.find({
      _id: {
        $in: savedJobs.map((jobId) => new mongoose.Types.ObjectId(jobId)),
      },
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { data: jobs, message: "Jobs fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Failed to fetch jobs", error: error },
      { status: 500 }
    );
  }
}
