import React from "react";
import {
  Users,
  UserCheck,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Star,
  BadgeCheck,
  Award,
  Zap,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      icon: <Users size={20} />,
      label: "Total Followers",
      value: "124.8K",
      trend: { value: "15% vs last week", positive: true },
      gradient: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      icon: <DollarSign size={20} />,
      label: "Total Earnings",
      value: "ETB 42,580",
      trend: { value: "6% vs last month", positive: true },
      gradient: "bg-gradient-to-br from-sky-50 to-sky-100",
      iconColor: "text-sky-600",
    },
    {
      icon: <Star size={20} />,
      label: "Average Rating",
      value: "4.9 ★",
      trend: { value: "0.2 vs last month", positive: true },
      gradient: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: <MessageSquare size={20} />,
      label: "Active Campaigns",
      value: "12",
      trend: { value: "4% vs last month", positive: true },
      gradient: "bg-gradient-to-br from-rose-50 to-rose-100",
      iconColor: "text-rose-600",
    },
    {
      icon: <TrendingUp size={20} />,
      label: "Applications",
      value: "284",
      trend: { value: "8% vs last month", positive: true },
      gradient: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconColor: "text-orange-600",
    },

    {
      icon: <BadgeCheck size={20} />,
      label: "Verification Status",
      value: "Verified",
      gradient: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className=" min-h-screen py-7">
      <div className="max-w-[1200px] mx-auto px-4 space-y-8">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold mb-4 px-3">
            Dashboard Overview
          </h1>
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            ETB 7,239.00
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 relative overflow-hidden transition-transform duration-150 ease-in-out hover:scale-[1.02] bg-gradient-to-br from-primary/20 to-blue-100`}
            >
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

              <div className="relative z-10 space-y-4 flex gap-5">
                {/* Icon */}
                <div className="w-13 h-13 rounded-lg bg-white/50 border flex items-center justify-center backdrop-blur-sm">
                  <div className={stat.iconColor}>{stat.icon}</div>
                </div>

                <div className="flex flex-col gap-2">
                  {/* Label and Value */}
                  <div className="flex flex-col gap-2">
                    <p className="text-gray-600 text-lg font-medium">
                      {stat.label}
                    </p>
                    <p className="text-gray-900 text-xl font-bold">
                      {stat.value}
                    </p>
                  </div>

                  {/* Trend (optional) */}
                  {stat.trend && (
                    <div
                      className={`flex items-center text-sm ${
                        stat.trend.positive
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      <span
                        className={`mr-1 ${
                          stat.trend.positive ? "" : "rotate-180"
                        }`}
                      >
                        ▲
                      </span>
                      {stat.trend.value}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
