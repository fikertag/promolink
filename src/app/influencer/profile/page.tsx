"use client";

import React from "react";
import Image from "next/image";
import EditProfile from "@/components/editProfile";
import SocialIcon from "@/components/SocialIcons";
import { MapPin, BadgeCheck, Mail, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function ProfilePage() {
  // Hard-coded data for now
  const name = "Fikiryilkal tages";
  const location = "Addis Ababa, Ethiopia";
  const verified = true;
  const rating = 4.7;
  const bio =
    "Content creator focused on tech and lifestyle. I help brands tell better stories with engaging, data-driven content.";
  const avgPrice = 1500; // Birr per promotion
  const coverUrl = "/fikir.tech.png"; // fallback placeholder
  const avatarUrl =
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face";
  const socials: {
    platform: "instagram" | "tiktok" | "telegram";
    followers: string;
    username: string;
  }[] = [
    { platform: "instagram", followers: "25,400", username: "@alemu_ig" },
    { platform: "tiktok", followers: "40,200", username: "@alemu_tt" },
    { platform: "telegram", followers: "8,150", username: "@alemu_tg" },
  ];

  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="mx-auto mt-5 sm:mt-0 p-4 sm:px-6 max-w-5xl mb-20">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div>
          <AspectRatio ratio={4 / 1} className="bg-lime-900">
            <Image
              src={coverUrl}
              alt="Image"
              fill
              className="rounded-md object-cover"
            />
            <div className="z-10 absolute top-3 right-3">
              <EditProfile />
            </div>
          </AspectRatio>
        </div>

        {/* Profile Info Section */}
        <div className="px-4 sm:px-6 pb-5">
          <div className="relative flex gap-3 sm:gap-4">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 ring-2 ring-white shadow-md -mt-2 sm:-mt-8">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="bg-gray-200">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl leading-tight">{name}</h1>
                {verified && (
                  <BadgeCheck
                    strokeWidth={3}
                    size={20}
                    className="text-blue-500"
                  />
                )}
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {location}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[15px] text-gray-700 leading-relaxed">{bio}</p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-gray-600">Avg rating:</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">
                  {rating.toFixed(1)}
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
                {avgPrice.toLocaleString()} Birr
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
                {socials.map((s) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
