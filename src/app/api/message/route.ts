import { NextResponse, NextRequest } from "next/server";
import Message, { IMessage } from "@/models/MessageSchema"; // Import the Message model
import dbConnect from "@/lib/mongoose"; // Utility to connect to MongoDB
import { z } from "zod"; // For input validation
import mongoose from "mongoose"; // For ObjectId validation

// Define validation schema for POST request
const SendMessageSchema = z.object({
  senderId: z.string().min(1, "Sender ID is required"),
  receiverId: z.string().min(1, "Receiver ID is required"),
  content: z.string().min(1, "Message content is required"),
});

// POST: Send a message from one user to another
export async function POST(request: NextRequest) {
  await dbConnect(); // Ensure the database is connected

  try {
    // Validate request body
    const body = await request.json();
    const validation = SendMessageSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.error.errors },
        { status: 400 }
      );
    }

    const { senderId, receiverId, content } = validation.data;

    // Validate ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      return NextResponse.json(
        { message: "Invalid Sender ID or Receiver ID" },
        { status: 400 }
      );
    }

    // Create a new message
    const newMessage: IMessage = new Message({
      senderId,
      receiverId,
      content,
    });

    const savedMessage = await newMessage.save();
    return NextResponse.json(savedMessage, { status: 201 }); // Return the created message
  } catch (error) {
    console.error("Error sending message:", error); // Log the error for debugging
    return NextResponse.json(
      {
        message: "Failed to send message",
        error,
      },
      { status: 500 }
    );
  }
}

// GET: Fetch messages for a specific user (either sent or received)
export async function GET(request: NextRequest) {
  await dbConnect(); // Ensure the database is connected

  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId"); // ID of the user fetching messages
    const type = url.searchParams.get("type"); // "sent" or "received"

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
    }

    // Validate type
    if (!type || (type !== "sent" && type !== "received")) {
      return NextResponse.json(
        { message: "Invalid type. Must be 'sent' or 'received'" },
        { status: 400 }
      );
    }

    // Build the query
    let query: any = {};
    if (type === "sent") {
      query.senderId = userId; // Fetch messages sent by the user
    } else if (type === "received") {
      query.receiverId = userId; // Fetch messages received by the user
    }

    // Fetch messages
    const messages = await Message.find(query)
      // .populate("senderId", "name email") // Populate sender details
      // .populate("receiverId", "name email") // Populate receiver details
      .sort({ createdAt: -1 }); // Sort by most recent first

    return NextResponse.json(messages, { status: 200 }); // Return the fetched messages
  } catch (error) {
    console.error("Error fetching messages:", error); // Log the error for debugging
    return NextResponse.json(
      {
        message: "Failed to fetch messages",
        error,
      },
      { status: 500 }
    );
  }
}

/**
 * API Documentation:
 *
 * POST /api/message
 * - Description: Sends a message from one user to another.
 * - Request Body:
 *   {
 *     "senderId": "UserObjectId",
 *     "receiverId": "UserObjectId",
 *     "content": "Message content"
 *   }
 * - Response:
 *   - 201: Returns the created message document.
 *   - 400: Returns validation errors or invalid ObjectId errors.
 *   - 500: Returns an error message if the creation fails.
 *
 * Example Request:
 * POST /api/message
 * Body:
 * {
 *   "senderId": "65f1c4f8e4b0a1a2b3c4d5e6",
 *   "receiverId": "65f1c4f8e4b0a1a2b3c4d5e7",
 *   "content": "Hello, let’s work together!"
 * }
 *
 * Example Response (201):
 * {
 *   "_id": "64f8c0e2b5d6c9a1f8e7b123",
 *   "senderId": "65f1c4f8e4b0a1a2b3c4d5e6",
 *   "receiverId": "65f1c4f8e4b0a1a2b3c4d5e7",
 *   "content": "Hello, let’s work together!",
 *   "createdAt": "2023-09-01T12:00:00.000Z",
 *   "updatedAt": "2023-09-01T12:00:00.000Z"
 * }
 *
 * GET /api/message
 * - Description: Fetches messages for a specific user (either sent or received).
 * - Query Parameters:
 *   - userId: The ID of the user fetching messages (required).
 *   - type: The type of messages to fetch ("sent" or "received") (required).
 * - Response:
 *   - 200: Returns an array of message documents.
 *   - 400: Returns validation errors for invalid userId or type.
 *   - 500: Returns an error message if the fetch fails.
 *
 * Example Request:
 * GET /api/message?userId=65f1c4f8e4b0a1a2b3c4d5e6&type=sent
 *
 * Example Response (200):
 * [
 *   {
 *     "_id": "64f8c0e2b5d6c9a1f8e7b123",
 *     "senderId": {
 *       "_id": "65f1c4f8e4b0a1a2b3c4d5e6",
 *       "name": "John Doe",
 *       "email": "john.doe@example.com"
 *     },
 *     "receiverId": {
 *       "_id": "65f1c4f8e4b0a1a2b3c4d5e7",
 *       "name": "Jane Smith",
 *       "email": "jane.smith@example.com"
 *     },
 *     "content": "Hello, let’s work together!",
 *     "createdAt": "2023-09-01T12:00:00.000Z",
 *     "updatedAt": "2023-09-01T12:00:00.000Z"
 *   }
 * ]
 */
