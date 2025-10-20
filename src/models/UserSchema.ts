// models/User.ts
import mongoose, { Schema } from "mongoose";

const GenericSchema = new Schema(
  {
    savedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
  },
  { strict: false, collection: "user" }
);

export const User =
  mongoose.models.User || mongoose.model("User", GenericSchema);
