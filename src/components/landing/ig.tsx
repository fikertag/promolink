"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { MessageCircle, Heart, User } from "lucide-react";

// AnimatedCounter logic adapted for this component
function AnimatedCounter({
  value,
  delay = 0,
}: {
  value: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { margin: "-50px", once: true });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 200,
  });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [rounded]);

  return <span ref={ref}>{displayValue}</span>;
}

const stats = [
  { icon: MessageCircle, value: 71, label: "Comments" },
  { icon: Heart, value: 179, label: "Likes" },
  { icon: User, value: 48, label: "Followers" },
];

export default function IgComponent() {
  return (
    <div className="relative w-fit mx-auto scale-75">
      <div className="bg-red-800 rounded-xl shadow-lg px-6 py-3 flex items-center justify-center gap-6 text-white">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center gap-2">
              <Icon className="w-6 h-6" fill="white" />
              <div className="text-2xl font-bold">
                <AnimatedCounter value={stat.value} delay={index * 0.2} />
              </div>
            </div>
          );
        })}
      </div>
      {/* Triangle pointing down */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderTop: "10px solid #dc2626", // Same as bg-red-600
        }}
      />
    </div>
  );
}
