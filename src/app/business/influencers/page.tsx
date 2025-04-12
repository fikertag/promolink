"use client";

// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Search, X } from "lucide-react";
import { InfluencerCard } from "@/components/influencers";
import { useInfluencers } from "@/context/Influencer";

export default function InfluencerSearchPage() {
  const { influencers } = useInfluencers();

  return (
    <div className="mx-auto container p-8">
      <h1 className="text-3xl font-bold mb-6">Find Influencers</h1>
      {/* <div className="mb-8">
        

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search influencers by name, specialty..."
            className="pl-10 pr-10"
          />
          <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" />
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Followers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="10k">10K+</SelectItem>
              <SelectItem value="50k">50K+</SelectItem>
              <SelectItem value="100k">100K+</SelectItem>
              <SelectItem value="1m">1M+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {influencers.map((influencer) => (
          <InfluencerCard key={influencer._id} influencer={influencer} />
        ))}
      </div>
    </div>
  );
}
