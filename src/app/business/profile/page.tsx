"use client";

import Link from "next/link";
import Image from "next/image";
import EditBuissnesProfile from "@/components/editBuissnesProfile";
import { MapPin, BadgeCheck, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import GoalDisplay from "@/components/GoalDisplay";

function ProfilePage() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  if (isPending) {
    return (
      <div className="mx-auto mt-5 sm:mt-0 p-4 sm:px-6 max-w-5xl mb-20">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <AspectRatio ratio={4 / 1} className="bg-muted">
            <Skeleton className="h-full w-full" />
          </AspectRatio>
          <div className="px-4 sm:px-6 pb-5">
            <div className="relative flex gap-3 sm:gap-4">
              <Skeleton className="h-16 w-16 sm:h-20 sm:w-20 rounded-full ring-2 ring-white shadow-md -mt-2 sm:-mt-8" />
              <div className="flex-1 pt-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32 mt-2" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <Separator className="my-4" />
            <div>
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">Failed to load profile data.</p>
        <Button onClick={() => refetch()}>Try again</Button>
      </div>
    );
  }

  if (session?.user?.role !== "business") {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">
          Access denied. This page is for business accounts only.
        </p>
        <Button onClick={() => refetch()}>Try again</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-5 sm:mt-0 p-4 sm:px-6 max-w-5xl mb-20">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div>
          <AspectRatio ratio={4 / 1} className="bg-muted">
            <Image
              src={
                session?.user?.coverImage ||
                "https://res.cloudinary.com/dzcmadjl1/image/upload/v1696224863/default-cover-image_oqv6u9.jpg"
              }
              alt="Cover image"
              fill
              className="rounded-md object-cover"
            />
            <div className="z-10 absolute top-3 right-3">
              <EditBuissnesProfile user={session?.user} />
            </div>
          </AspectRatio>
        </div>

        {/* Profile Info Section */}
        <div className="px-4 sm:px-6 pb-5">
          <div className="relative flex gap-3 sm:gap-4">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 ring-2 ring-white shadow-md -mt-2 sm:-mt-8">
              <AvatarImage
                src={session?.user?.image || "https://github.com/shadcn.png"}
                alt={"name"}
              />
              <AvatarFallback className="bg-gray-200">
                {session?.user?.name?.[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl leading-tight">
                  {session?.user?.companyName || "No company name"}
                </h1>
                {session?.user?.businessVerified && (
                  <BadgeCheck
                    strokeWidth={3}
                    size={20}
                    className="text-blue-500"
                  />
                )}
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />{" "}
                  {session?.user?.location || "No location"}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[15px] text-gray-700 leading-relaxed">
              {session?.user?.bio || "No bio yet."}
            </p>
            <div className="mt-3 text-sm">
              <span className="text-gray-600">Industry:</span>{" "}
              <span className="font-medium">
                {session?.user?.industry || "Not specified"}
              </span>
            </div>
            <div className="mt-3 text-sm">
              <span className="text-gray-600">Business Size:</span>{" "}
              <span className="font-medium">
                {session?.user?.businessSize || "Not specified"}
              </span>
            </div>
            <div className="mt-3 text-sm">
              <span className="text-gray-600">Business Phone:</span>{" "}
              <span className="font-medium">
                {session?.user?.businessPhone || "Not specified"}
              </span>
            </div>
            <div className="mt-3 text-sm">
              <span className="text-gray-600">Onboarded:</span>{" "}
              <span className="font-medium">
                {session?.user?.onboarded ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Goals section */}
          <div>
            <div className="flex items-center justify-between py-2">
              <div className="text-base font-semibold text-gray-900">
                Business Goals
              </div>
              <Link href="/business/goals">
                <Button variant="outline" size="sm">
                  Manage Goals
                </Button>
              </Link>
            </div>
            <div className="pt-2">
              <GoalDisplay businessId={session?.user?.id || ""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
