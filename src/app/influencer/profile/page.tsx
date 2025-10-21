"use client";

import React from "react";
import Image from "next/image";
import EditProfile from "@/components/editProfile";
import SocialIcon from "@/components/SocialIcons";
import { MapPin, BadgeCheck, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function ProfilePage() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  const rating = session?.user?.rating || 0;
  const socials: {
    platform: "instagram" | "tiktok" | "telegram";
    followers: string;
    username: string;
  }[] = session?.user?.socialMedia ? JSON.parse(session.user.socialMedia) : [];

  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

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

  if (session?.user?.role !== "influencer") {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">
          Access denied. This page is for influencer accounts only.
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
              <EditProfile user={session?.user} />
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
                  {session?.user?.name || "No name"}
                </h1>
                {session?.user?.verified ||
                  (false && (
                    <BadgeCheck
                      strokeWidth={3}
                      size={20}
                      className="text-blue-500"
                    />
                  ))}
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
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-gray-600">Avg rating:</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">
                  {(session?.user?.rating || 0).toFixed(1)}
                </span>
                <div className="flex items-center">
                  {Array.from({ length: fullStars }).map((_, i) => (
                    <Star
                      key={`full-${i}`}
                      className="h-4 w-4 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                  {hasHalf && <Star className="h-4 w-4 text-yellow-500" />}
                  {Array.from({ length: emptyStars }).map((_, i) => (
                    <Star
                      key={`empty-${i}`}
                      className="h-4 w-4 text-gray-300"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 text-sm">
              <span className="text-gray-600">Avg price:</span>{" "}
              <span className="font-medium">
                {session?.user?.price?.toLocaleString()} Birr
              </span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Social Media Section */}
          <div>
            <div className="py-2">
              <div className="text-base font-semibold text-gray-900">
                Social Media
              </div>
            </div>
            <div className="pt-2">
              <div className="space-y-3">
                {socials.length > 0 ? (
                  socials.map((s) => (
                    <div
                      key={s.platform}
                      className="flex items-center justify-between py-3 px-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <SocialIcon platform={s.platform} />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {s.platform}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 tabular-nums">
                        {s.followers} followers
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No social media accounts linked yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
