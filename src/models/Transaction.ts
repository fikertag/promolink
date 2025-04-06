import mongoose, { Schema, Document, model } from "mongoose";

export interface IEarnings extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the user
  amount: number; // Transaction amount
  status: "paid" | "unpaid"; // Explicit status (no redundant "total")
  paymentDate?: Date; // Only set when status=paid
  source: string; // E.g., "promo_campaign", "referral", etc.
  metadata?: Record<string, any>; // Additional context (optional)
  createdAt: Date;
  updatedAt: Date;
}

const EarningsSchema = new Schema<IEarnings>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0, // Prevent negative values
    },
    status: {
      type: String,
      enum: ["paid", "unpaid"], // Strictly controlled values
      default: "unpaid",
      required: true,
    },
    paymentDate: {
      type: Date,
      required: function () {
        return this.status === "paid"; // Only required if paid
      },
    },
    source: {
      type: String,
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed, // Flexible storage for additional data
      default: {},
    },
  },
  { timestamps: true } // Auto-add createdAt/updatedAt
);

const Earnings =
  mongoose.models.Earnings || model<IEarnings>("Earnings", EarningsSchema);

export default Earnings;
