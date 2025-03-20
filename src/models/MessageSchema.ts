import mongoose, { Schema, Document, model } from "mongoose";

// Define an interface for the Message document
export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Message schema
const MessageSchema = new Schema<IMessage>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Export the Message model
const Message =
  mongoose.models.Message || model<IMessage>("Message", MessageSchema);
export default Message;
