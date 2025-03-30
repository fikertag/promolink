import mongoose, { Schema, Document, model } from "mongoose";

export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  content: string;
  status: {
    delivered: boolean;
    read: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 2000,
    },
    status: {
      delivered: { type: Boolean, required: true, default: false },
      read: { type: Boolean, required: true, default: false },
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Indexes
MessageSchema.index({ conversationId: 1, createdAt: -1 });
MessageSchema.index({ senderId: 1 });

const Message =
  mongoose.models.Message || model<IMessage>("Message", MessageSchema);
export default Message;
