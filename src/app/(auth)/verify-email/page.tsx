"use client";

import { Suspense } from "react";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const VerifyEmailContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  const resendVerificationEmail = async () => {
    if (isCooldown || isLoading) return;

    setIsLoading(true);
    try {
      await authClient.sendVerificationEmail({
        email: email,
        callbackURL: "/",
      });
      setIsCooldown(true);
      setCooldownTime(60);
    } catch (error) {
      alert("Failed to send verification email. Please try again later.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCooldown) {
      timer = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCooldown(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCooldown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-5">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Verify Your Email
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          We&aposve sent a verification email to your email address. Please
          check your inbox and click the link to verify your account.
        </p>
        <p className="text-gray-500 text-xs">
          Didn&apost receive the email? Check your spam folder or
          <button
            onClick={resendVerificationEmail}
            disabled={isCooldown || isLoading}
            className={`text-blue-500 hover:underline w-full text-center flex ${
              isCooldown || isLoading ? "cursor-not-allowed text-gray-400" : ""
            } flex items-center justify-center`}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
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

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmailPage;
