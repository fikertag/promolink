import {
  Cpu,
  Fingerprint,
  Pencil,
  Settings2,
  Sparkles,
  Zap,
} from "lucide-react";

export default function Features() {
  return (
    <section className="py-12 md:py-20" id="Features">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto space-y-6 text-center md:space-y-8 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-normal ">
            Why Choose Mykalat
          </h2>
          <p className=" max-w-xl">
            Connect businesses, influencers, and customers in a seamless
            platform for authentic promotions and mutual growth.
          </p>
        </div>

        <div className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="size-4" />
              <h3 className="text-sm font-medium">Business Profiles</h3>
            </div>
            <p className="text-sm">
              Create a profile showcasing your products to relevant audiences.
              Get exposure to influencers whose followers match your target
              market.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="size-4" />
              <h3 className="text-sm font-medium">Performance Tracking</h3>
            </div>
            <p className="text-sm">
              Track performance with real-time analytics and insights. Pay only
              for results with our commission-based system.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Fingerprint className="size-4" />

              <h3 className="text-sm font-medium">Influencer Matching</h3>
            </div>
            <p className="text-sm">
              Browse businesses that align with your audience's interests.
              Generate custom promo codes and earn 5-15% commission on sales.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Pencil className="size-4" />

              <h3 className="text-sm font-medium">Earnings Dashboard</h3>
            </div>
            <p className="text-sm">
              Track earnings and conversions in an intuitive dashboard. Build
              long-term relationships with brands you love.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Settings2 className="size-4" />

              <h3 className="text-sm font-medium">Exclusive Deals</h3>
            </div>
            <p className="text-sm">
              Discover exclusive deals from your favorite influencers. Enjoy
              special discounts not available elsewhere.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4" />

              <h3 className="text-sm font-medium">Recommendations</h3>
            </div>
            <p className="text-sm">
              Explore new brands through trusted recommendations. Support both
              businesses and creators you love.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
