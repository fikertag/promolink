import { NextResponse, NextRequest } from "next/server";
import Job from "@/models/JobSchema"; // Import the Job model
import dbConnect from "@/lib/mongoose"; // Utility to connect to MongoDB
import mongoose from "mongoose"; // For ObjectId validation

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect(); // Ensure the database is connected

  try {
    const { id } = await params; // Extract the job ID from the dynamic route parameter
    const { influencerId } = await request.json(); // Extract the influencer ID from the request body

    // Validate the job ID and influencer ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Job ID" }, { status: 400 });
    }
    if (!influencerId || !mongoose.Types.ObjectId.isValid(influencerId)) {
      return NextResponse.json(
        { message: "Invalid Influencer ID" },
        { status: 400 }
      );
    }

    // Update the job by adding the influencer to the hiredInfluencers array
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { $addToSet: { hiredInfluencers: influencerId } }, // Use $addToSet to avoid duplicates
      { new: true } // Return the updated document
    ); // Populate not working with name and email

    // If the job is not found, return a 404 status
    if (!updatedJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // Return the updated job with a 200 status
    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error("Error updating hired influencers:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to update hired influencers", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect(); // Ensure the database is connected

  try {
    const { id } = await params; // Extract the job ID from the dynamic route parameter

    // Validate the job ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Job ID" }, { status: 400 });
    }

    // Attempt to delete the job from the database
    const deletedJob = await Job.findByIdAndDelete(id);

    // If the job is not found, return a 404 status
    if (!deletedJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // Return a success message with the deleted job
    return NextResponse.json(
      { message: "Job deleted successfully", job: deletedJob },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting job:", error); // Log the error for debugging
    return NextResponse.json(
      {
        message: "Failed to delete job",
        error,
      },
      { status: 500 }
    );
  }
}

/**
* API Documentation:
*
* DELETE /api/job/[id]
* - Description: Deletes a job from the database based on the provided job ID.
* - Route Parameter:
*   - [id]: The ID of the job to delete (must be a valid MongoDB ObjectId).
* - Response:
*   - 200: Returns a success message and the deleted job document.
*   - 400: Returns an error message if the job ID is invalid.
*   - 404: Returns an error message if the job is not found.
*   - 500: Returns an error message if the deletion fails.
*
* Example Request:
* DELETE /api/job/64f8c0e2b5d6c9a1f8e7b123
*
* Example Response (200):
* {
*   "message": "Job deleted successfully",
*   "job": {
*     "_id": "64f8c0e2b5d6c9a1f8e7b123",
*     "title": "Social Media Promoter Needed",
*     "description": "Looking for someone to promote our product on TikTok and YouTube.",
*     "price": 200,
*     "location": "Los Angeles",
*     "socialMedia": [
*       { "platform": "tiktok" },
*       { "platform": "youtube" }
*     ],
*     "postedBy": "67ddc27bac1483e290fd607b",
*     "status": "open",
*     "createdAt": "2023-09-01T12:00:00.000Z",
*     "updatedAt": "2023-09-01T12:00:00.000Z"
*   }
* }

 * PATCH /api/job/[id]
 * - Description: Adds an influencer to the `hiredInfluencers` array of a job.
 * - Route Parameter:
 *   - [id]: The ID of the job to update (must be a valid MongoDB ObjectId).
 * - Request Body:
 *   {
 *     "influencerId": "InfluencerObjectId"
 *   }
 * - Response:
 *   - 200: Returns the updated job document with the added influencer.
 *   - 400: Returns an error message if the job ID or influencer ID is invalid.
 *   - 404: Returns an error message if the job is not found.
 *   - 500: Returns an error message if the update fails.
 *
 * Example Request:
 * PATCH /api/job/64f8c0e2b5d6c9a1f8e7b123
 * Body:
 * {
 *   "influencerId": "67ddc27bac1483e290fd607b"
 * }
 *
 * Example Response (200):
 * {
 *   "_id": "64f8c0e2b5d6c9a1f8e7b123",
 *   "title": "Social Media Promoter Needed",
 *   "description": "Looking for someone to promote our product on TikTok and YouTube.",
 *   "price": 200,
 *   "location": "Los Angeles",
 *   "socialMedia": [
 *     { "platform": "tiktok" },
 *     { "platform": "youtube" }
 *   ],
 *   "postedBy": "67ddc27bac1483e290fd607b",
 *   "status": "open",
 *   "hiredInfluencers": [
 *     {
 *       "_id": "67ddc27bac1483e290fd607b",
 *       "name": "John Doe",
 *       "email": "john.doeexample.com"
 *     }
 *   ],
 *   "createdAt": "2023-09-01T12:00:00.000Z",
 *   "updatedAt": "2023-09-01T12:00:00.000Z"
 * }
 */
