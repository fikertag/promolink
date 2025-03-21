import { NextResponse, NextRequest } from "next/server";
import Message, { IMessage } from "@/models/MessageSchema"; // Adjust the path as needed
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
  await dbConnect();

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
    return NextResponse.json(savedMessage, { status: 201 });
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
  await dbConnect();

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
      .populate("senderId", "name email") // Populate sender details
      .populate("receiverId", "name email") // Populate receiver details
      .sort({ createdAt: -1 }); // Sort by most recent first

    return NextResponse.json(messages, { status: 200 });
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

// curl -X GET "http://localhost:3000/api/message?userId=65f1c4f8e4b0a1a2b3c4d5e6&type=sent"

// curl -X POST http://localhost:3000/api/message \
// -H "Content-Type: application/json" \
// -d '{
//   "senderId": "65f1c4f8e4b0a1a2b3c4d5e6",
//   "receiverId": "65f1c4f8e4b0a1a2b3c4d5e7",
//   "content": "Hello, let’s work together!"
// }'
