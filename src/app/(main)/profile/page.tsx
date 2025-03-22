"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Edit2,
  MapPin,
  Camera,
  Star,
  ChevronRight,
  DollarSign,
  Users,
  Instagram,
  Youtube,
  Twitter,
  TrendingUp,
} from "lucide-react";

function App() {
  const [location, setLocation] = useState("Addis Ababa, Ethiopia");

  const socialStats = [
    {
      platform: "Instagram",
      followers: "28.2K",
      icon: Instagram,
      growth: "+5.2%",
    },
    { platform: "Youtube", followers: "15.6K", icon: Youtube, growth: "+3.8%" },
    { platform: "Twitter", followers: "8.6K", icon: Twitter, growth: "+2.4%" },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 relative">
          <button className="text-gray-400 hover:text-white transition-all hover:bg-primary rounded-full p-2 absolute  top-3 right-4">
            <Edit2 size={18} />
          </button>
          <div className="relative w-20 h-20 mx-auto mb-1">
            <Image
              src="/pawn.png"
              alt="Profile"
              layout="fill"
              objectFit="contain"
              className="rounded-full object-cover"
            />
            <button
              className="absolute bottom-0 right-0 bg-primary p-2 rounded-full text-white hover:bg-primary transition-colors"
              aria-label="Edit profile picture"
            >
              <Camera size={20} />
            </button>
          </div>

          <div className="text-center mb-3 flex flex-col gap-1">
            <div className="flex items-center justify-center gap-2  ">
              <h1 className="text-2xl font-semibold text-gray-900 mt-1  ">
                Fikiryilkal{" "}
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <MapPin size={16} />

              <button className="hover:text-primary text-base transition-colors">
                {location}
              </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-600 max-w-lg mx-auto text-base font-light">
              Lifestyle and wellness influencer passionate about sustainable
              living and mindful consumption. Sharing daily inspiration for a
              balanced life.
            </p>
          </div>

          {/* Social Media Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {socialStats.map((social) => (
              <div key={social.platform} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <social.icon className="text-primary" size={20} />
                  <span className="text-gray-700 font-medium">
                    {social.platform}
                  </span>
                </div>
                <div className="text-2xl text-center font-bold text-gray-900 mb-1">
                  {social.followers}
                </div>
                <div className="flex items-center justify-center gap-1 text-green-500 text-sm">
                  <TrendingUp size={14} />
                  <span>{social.growth}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-1">
                <Users size={20} />
                <span className="text-2xl font-bold">52.4K</span>
              </div>
              <p className="text-gray-600 text-sm text-center">
                Total Followers
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-1">
                <DollarSign size={20} />
                <span className="text-2xl font-bold">500</span>
              </div>
              <p className="text-gray-600 text-sm text-center">
                Price/Campaign
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-1">
                <Star size={20} />
                <span className="text-2xl font-bold">4.9</span>
              </div>
              <p className="text-gray-600 text-sm">Rating</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Previous Campaigns
            </h2>
            <div className="space-y-4">
              {["spring fashion", "Kebe Food Delivery", "Flash Gym"].map(
                (campaign) => (
                  <div
                    key={campaign}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-prtext-primary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {campaign}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Completed • Feb 2024
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400" size={20} />
                  </div>
                )
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bgprimary transition-colors">
              Request Collaboration
            </button>
          </div>
        </div>

        {/* Previous Campaigns */}
      </div>
    </div>
  );
}

export default App;
