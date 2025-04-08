"use client";

import { useEarnings } from "@/context/Earning";
import { DollarSign } from "lucide-react";

const Dashboard = () => {
  const { getTotalEarnings } = useEarnings();
  // Calculate earnings for the current user
  const userEarnings = getTotalEarnings();
  const stats = [
    {
      icon: <DollarSign size={20} />,
      label: "Total Earnings",
      value: userEarnings.total,
      gradient: "bg-gradient-to-br from-sky-50 to-sky-100",
      iconColor: "text-sky-600",
    },
    {
      icon: <DollarSign size={20} />,
      label: "Paid Earnings",
      value: userEarnings.paid,
      gradient: "bg-gradient-to-br from-sky-50 to-sky-100",
      iconColor: "text-sky-600",
    },
    {
      icon: <DollarSign size={20} />,
      label: "Unpaid Earnings",
      value: userEarnings.unpaid,
      gradient: "bg-gradient-to-br from-sky-50 to-sky-100",
      iconColor: "text-sky-600",
    },
  ];

  return (
    <div className="  py-7">
      <div className="max-w-[1200px] mx-auto px-4 space-y-8">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold px-3">Dashboard</h1>
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            ETB {userEarnings.total}
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

              <div className="relative space-y-4 flex gap-5">
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
