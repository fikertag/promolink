import StatsCount from "@/components/ui/statscount";
const stats = [
  { value: 30, suffix: "+", label: "Influencers" },
  { value: 80, suffix: "+", label: "Businesses" },
  { value: 99, suffix: "%", label: "Satisfaction" },
];
export default function StatsCountDemo() {
  return (
    <StatsCount
      stats={stats}
      title="WHAT STATS SAY ABOUT US "
      showDividers={true}
      className=""
    />
  );
}
