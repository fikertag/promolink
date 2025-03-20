import mongoose, { Schema, Document, model } from "mongoose";

// Define an interface for the Contract document
export interface IContract extends Document {
  jobId: mongoose.Types.ObjectId;
  influencerId: mongoose.Types.ObjectId;
  clientId: mongoose.Types.ObjectId;
  terms: string;
  status: "pending" | "accepted" | "declined";
  createdAt: Date;
  updatedAt: Date;
}

// Define the Contract schema
const ContractSchema = new Schema<IContract>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    influencerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    terms: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Export the Contract model
const Contract =
  mongoose.models.Contract || model<IContract>("Contract", ContractSchema);
export default Contract;
