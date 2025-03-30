import mongoose, { Schema, Document, model } from "mongoose";

export interface IConversation extends Document {
  participants: [mongoose.Types.ObjectId, mongoose.Types.ObjectId];
  createdAt: Date;
  updatedAt: Date;
  lastMessage: string;
}

const ConversationSchema = new Schema<IConversation>(
  {
    participants: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
      validate: {
        validator: function (arr: mongoose.Types.ObjectId[]) {
          return arr.length === 2 && arr[0].toString() !== arr[1].toString();
        },
        message: "1:1 conversations must have exactly 2 distinct participants",
      },
    },
    lastMessage: { type: String, required: true, default: "Chat started" },
  },
  { timestamps: true }
);

// Indexes
ConversationSchema.index({ participants: 1 });
ConversationSchema.index({ updatedAt: -1 });

const Conversation =
  mongoose.models.Conversation ||
  model<IConversation>("Conversation", ConversationSchema);
export default Conversation;
