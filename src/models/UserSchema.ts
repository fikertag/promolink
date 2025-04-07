// models/User.ts
import mongoose from "mongoose";

const GenericSchema = new mongoose.Schema(
  {},
  { strict: false, collection: "user" }
);

export const User =
  mongoose.models.User || mongoose.model("User", GenericSchema);
