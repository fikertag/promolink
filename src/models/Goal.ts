import mongoose, { Schema, Document, model } from "mongoose";

// Define an interface for the Business Goal document
export interface IBusinessGoal extends Document {
  businessId: mongoose.Types.ObjectId;
  targetValue: number;
  currentValue: number;
  unit: "dollars" | "customers" | "sales" | "tickets" | "hours";
  startDate: Date;
  estimatedEndDate: Date;
  createdAt: Date;
  updatedAt: Date;

  // Virtuals
  progressPercent?: number;
  paceInfo?: {
    status: "ahead" | "on track" | "behind" | "not started";
    pace: number;
  };
  isCompleted?: boolean;
}

// Define the schema
const BusinessGoalSchema = new Schema<IBusinessGoal>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business", // Reference to a Business model
      required: true,
    },
    targetValue: { type: Number, required: true, min: 0 },
    currentValue: { type: Number, default: 0, min: 0 },
    unit: {
      type: String,
      enum: ["dollars", "customers", "sales", "tickets", "hours"],
      required: true,
    },
    startDate: { type: Date, required: true },
    estimatedEndDate: { type: Date, required: true },
  },
  { timestamps: true }
);

// ✅ Virtuals

// Progress percentage
BusinessGoalSchema.virtual("progressPercent").get(function (
  this: IBusinessGoal
) {
  return (this.currentValue / this.targetValue) * 100;
});

// Pace info
BusinessGoalSchema.virtual("paceInfo").get(function (this: IBusinessGoal) {
  const now = new Date();
  const totalDuration =
    this.estimatedEndDate.getTime() - this.startDate.getTime();
  const elapsed = now.getTime() - this.startDate.getTime();

  if (elapsed <= 0) return { status: "not started", pace: 0 };

  const expectedProgress = (elapsed / totalDuration) * 100;
  const actualProgress = (this.currentValue / this.targetValue) * 100;
  const paceDiff = actualProgress - expectedProgress;

  let status: "ahead" | "on track" | "behind" = "on track";
  if (paceDiff > 0) status = "ahead";
  if (paceDiff < 0) status = "behind";

  return { status, pace: Math.round(paceDiff) };
});

// Completion flag
BusinessGoalSchema.virtual("isCompleted").get(function (this: IBusinessGoal) {
  return this.currentValue >= this.targetValue;
});

// Ensure virtuals are included in JSON output
BusinessGoalSchema.set("toJSON", { virtuals: true });
BusinessGoalSchema.set("toObject", { virtuals: true });

const BusinessGoal =
  mongoose.models.BusinessGoal ||
  model<IBusinessGoal>("BusinessGoal", BusinessGoalSchema);

export default BusinessGoal;
