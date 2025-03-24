"use client";

import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [isCooldown, setIsCooldown] = useState(false); // Cooldown state
  const [cooldownTime, setCooldownTime] = useState(60); // Cooldown timer (in seconds)
  const [isLoading, setIsLoading] = useState(false); // Loading state for resend button

  const resendVerificationEmail = async () => {
    if (isCooldown || isLoading) return; // Prevent resending during cooldown or loading

    setIsLoading(true); // Start loading
    try {
      await authClient.sendVerificationEmail({
        email: email,
        callbackURL: "/", // The redirect URL after verification
      });
      // Start cooldown
      setIsCooldown(true);
      setCooldownTime(60); // Reset cooldown timer to 60 seconds
    } catch (error) {
      alert("Failed to send verification email. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Cooldown timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCooldown) {
      timer = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCooldown(false); // End cooldown
            return 60; // Reset timer
          }
          return prev - 1;
        });
      }, 1000); // Decrease timer every second
    }
    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [isCooldown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-5">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 ">
          Verify Your Email
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          We&#39;ve sent a verification email to your email address. Please
          check your inbox and click the link to verify your account.
        </p>
        <p className="text-gray-500 text-xs">
          Didn&#39;t receive the email? Check your spam folder or
          <button
            onClick={resendVerificationEmail}
            disabled={isCooldown || isLoading} // Disable button during cooldown or loading
            className={`text-blue-500 hover:underline w-full text-center flex ${
              isCooldown || isLoading ? "cursor-not-allowed text-gray-400" : ""
            } flex items-center justify-center`}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin " />
            ) : (
              "resend the email"
            )}
          </button>
          .
        </p>
        {isCooldown && (
          <p className="text-gray-500 text-xs">
            You can resend the email in {cooldownTime} seconds.
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
