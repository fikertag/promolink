import mongoose, { Schema, Document, model } from "mongoose";

// Define an interface for the Proposal document
export interface IProposal extends Document {
  jobId: mongoose.Types.ObjectId;
  influencerId: mongoose.Types.ObjectId;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

// Define the Proposal schema
const ProposalSchema = new Schema<IProposal>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    influencerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Export the Proposal model
const Proposal =
  mongoose.models.Proposal || model<IProposal>("Proposal", ProposalSchema);
export default Proposal;
