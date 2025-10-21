"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import GoalManagement from "@/components/GoalManagement";

function GoalsPage() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  if (isPending) {
    return (
      <div className="mx-auto mt-5 sm:mt-0 p-4 sm:px-6 max-w-5xl mb-20">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">Failed to load session data.</p>
        <Button onClick={() => refetch()}>Try again</Button>
      </div>
    );
  }

  if (!session?.user?.id) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">No business account found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-5 sm:mt-0 p-4 sm:px-6 max-w-5xl mb-20">
      <GoalManagement businessId={session.user.id} />
    </div>
  );
}

export default GoalsPage;
