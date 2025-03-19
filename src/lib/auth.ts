import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { sendEmail } from "./email-service";
import { passkey } from "better-auth/plugins/passkey";
import dbConnect from "@/lib/mongoose";
import mongoose from "mongoose";

await dbConnect();

const db = mongoose.connection.db;

if (!db) {
  throw new Error("Database connection is not established.");
}

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "influencer",
        input: false,
      },
      location: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      socialMedia: {
        type: "string", // Store as a JSON string
        required: false,
        defaultValue: "[]", // Default empty array as a string
      },
      verified: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
      rating: {
        type: "number",
        required: false,
        defaultValue: 0,
      },
      totalEarnings: {
        type: "number",
        required: false,
        defaultValue: 0,
      },
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        html: `Click the link to verify your email: ${url}`,
      });
    },
  },

  plugins: [passkey()],
});
