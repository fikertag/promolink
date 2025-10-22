"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Verified,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

export function ProfileHeader({
  name,
  email,
  avatarUrl,
  location,
  isVerified,
}: {
  name: string;
  email: string;
  avatarUrl: string;
  location: string;
  isVerified: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-background">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <h1 className="text-2xl sm:text-3xl font-bold">{name}</h1>
          {isVerified && <Verified className="text-blue-500 w-6 h-6" />}
        </div>
        <p className="text-muted-foreground">{email}</p>
        <div className="flex items-center gap-2 mt-1 justify-center sm:justify-start">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">{location}</span>
        </div>
      </div>
    </div>
  );
}

export function ProfileStats({
  rating,
  price,
}: {
  rating: number;
  price: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="p-4 bg-muted rounded-lg text-center">
        <div className="flex items-center justify-center gap-1">
          <Star className="w-5 h-5 text-yellow-500" />
          <p className="text-xl font-bold">{rating.toFixed(1)}</p>
        </div>
        <p className="text-sm text-muted-foreground">Average Rating</p>
      </div>
      <div className="p-4 bg-muted rounded-lg text-center">
        <p className="text-xl font-bold">${price}</p>
        <p className="text-sm text-muted-foreground">Price/Promotion</p>
      </div>
    </div>
  );
}

export function ProfileBio({ bio }: { bio: string }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">About Me</h2>
      <p className="mt-2 text-muted-foreground">{bio}</p>
    </div>
  );
}

export function SocialMediaLinks({
  socials,
}: {
  socials: { platform: string; followers: string; link: string }[];
}) {
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "twitter":
        return <Twitter className="w-5 h-5" />;
      case "youtube":
        return <Youtube className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">Socials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {socials.map((social) => (
          <a
            key={social.platform}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
          >
            {getIcon(social.platform)}
            <div>
              <p className="font-semibold capitalize">{social.platform}</p>
              <p className="text-sm text-muted-foreground">
                {social.followers} Followers
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
