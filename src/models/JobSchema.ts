import mongoose, { Schema, Document, model } from "mongoose";

// Define an interface for the Job document
export interface IJob extends Document {
  title: string;
  description: string;
  price: number;
  location?: string;
  socialMedia: {
    platform: "instagram" | "youtube" | "tiktok" | "telegram";
  }[];
  postedBy: mongoose.Types.ObjectId;
  status: "open" | "in-progress" | "completed" | "cancelled";
  hiredInfluencers: mongoose.Types.ObjectId[]; // Array of hired influencers
  proposalsSubmitted: mongoose.Types.ObjectId[]; // Array of hired influencers
  createdAt: Date;
  updatedAt: Date;
}

// Define the Job schema
const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 }, // Ensure price is non-negative
    location: { type: String, trim: true },
    socialMedia: [
      {
        platform: {
          type: String,
          enum: ["instagram", "youtube", "tiktok", "telegram"], // Restrict to valid platforms
          required: true,
        },
      },
    ],
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "completed", "cancelled"], // Restrict to valid statuses
      default: "open", // Default status is "open"
    },
    hiredInfluencers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
      },
    ],
    proposalsSubmitted: [
      {
        type: Schema.Types.ObjectId,
        ref: "Proposal", // Reference to the User model
      },
    ],
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || model<IJob>("Job", JobSchema);
export default Job;
