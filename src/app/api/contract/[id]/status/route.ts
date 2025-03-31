// app/api/contracts/[id]/status/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Contract from "@/models/ContractSchema";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  await dbConnect();

  try {
    const { status } = await request.json();

    const { id } = await params; // Access URL params

    if (!["draft", "active", "completed", "terminated"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updatedContract = await Contract.findByIdAndUpdate(
      id,
      {
        status,
        ...(status === "active" && { activatedAt: new Date() }),
        ...(status === "completed" && { completedAt: new Date() }),
      },
      { new: true }
    );

    if (!updatedContract) {
      return NextResponse.json(
        { error: "Contract not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedContract);
  } catch (error) {
    console.error("Error updating contract:", error); // Log the error for debugging
    return NextResponse.json(
      { error: "Failed to update contract" },
      { status: 500 }
    );
  }
}

/**
 * API Documentation:
 *
 * PATCH /api/contract/[id]/status
 * - Description: Updates the status of a specific contract and sets custom timestamps (`activatedAt` or `completedAt`) based on the new status.
 * - Path Parameters:
 *   - id (required): The ID of the contract to update.
 * - Request Body:
 *   {
 *     "status": "active" | "completed" | "draft" | "terminated"
 *   }
 * - Response:
 *   - 200: Returns the updated contract document.
 *     {
 *       "_id": "ContractObjectId",
 *       "status": "active",
 *       "activatedAt": "2025-03-30T12:00:00.000Z",
 *       "completedAt": null,
 *       "createdAt": "2025-03-29T10:00:00.000Z",
 *       "updatedAt": "2025-03-30T12:00:00.000Z"
 *     }
 *   - 400: Returns an error message if the status is invalid.
 *     {
 *       "error": "Invalid status"
 *     }
 *   - 404: Returns an error message if the contract is not found.
 *     {
 *       "error": "Contract not found"
 *     }
 *   - 500: Returns an error message if there is a server error.
 *     {
 *       "error": "Failed to update contract"
 *     }
 *
 * Detailed Behavior:
 * - Validates the `status` field to ensure it is one of the allowed values: `"draft"`, `"active"`, `"completed"`, `"terminated"`.
 * - Updates the `status` field of the specified contract.
 * - If the `status` is `"active"`, sets the `activatedAt` field to the current date and time.
 * - If the `status` is `"completed"`, sets the `completedAt` field to the current date and time.
 * - Returns a `404` error if the contract is not found.
 * - Returns a `500` error if there is a server error during the update.
 *
 * Example Requests:
 *
 * PATCH /api/contract/64f8c0e2b5d6c9a1f8e7b123/status
 * Request Body:
 *   {
 *     "status": "active"
 *   }
 * Response (200):
 *   {
 *     "_id": "64f8c0e2b5d6c9a1f8e7b123",
 *     "status": "active",
 *     "activatedAt": "2025-03-30T12:00:00.000Z",
 *     "completedAt": null,
 *     "createdAt": "2025-03-29T10:00:00.000Z",
 *     "updatedAt": "2025-03-30T12:00:00.000Z"
 *   }
 *
 * PATCH /api/contract/64f8c0e2b5d6c9a1f8e7b123/status
 * Request Body:
 *   {
 *     "status": "completed"
 *   }
 * Response (200):
 *   {
 *     "_id": "64f8c0e2b5d6c9a1f8e7b123",
 *     "status": "completed",
 *     "activatedAt": "2025-03-30T12:00:00.000Z",
 *     "completedAt": "2025-03-31T12:00:00.000Z",
 *     "createdAt": "2025-03-29T10:00:00.000Z",
 *     "updatedAt": "2025-03-31T12:00:00.000Z"
 *   }
 *
 * Response (400):
 *   {
 *     "error": "Invalid status"
 *   }
 *
 * Response (404):
 *   {
 *     "error": "Contract not found"
 *   }
 *
 * Response (500):
 *   {
 *     "error": "Failed to update contract"
 *   }
 */
