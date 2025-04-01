import mongoose from "mongoose";

const SocialMediaActionSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ["instagram", "tiktok", "youtube", "twitter"],
    required: true,
  },
  actionType: {
    type: String,
    enum: ["post", "story", "reel", "live"],
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const ContractSchema = new mongoose.Schema(
  {
    // Core References
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
      required: true,
    },
    // Contract Terms
    price: {
      type: Number,
      required: true,
    },
    socialMediaActions: [SocialMediaActionSchema],
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "active", "completed", "terminated"],
      default: "draft",
    },

    activatedAt: Date,
    completedAt: Date,
  },
  { timestamps: true }
);

// Auto-update timestamps
ContractSchema.pre("save", function (next) {
  if (
    this.isModified("status") &&
    this.status === "active" &&
    !this.activatedAt
  ) {
    this.activatedAt = new Date();
  }
  if (this.isModified("status") && this.status === "completed") {
    this.completedAt = new Date();
  }
  next();
});
export default mongoose.models.Contract ||
  mongoose.model("Contract", ContractSchema);
