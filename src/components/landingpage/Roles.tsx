import Link from "next/link";
import { Building2, SquareUser, ShieldUser, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const roles = [
  {
    icon: <Building2 size={24} />,
    gradient: "from-primary to-accent",
    title: "For Businesses",
    benefits: [
      "Create a profile showcasing your products to relevant audiences",
      "Get exposure to influencers whose followers match your target market",
      "Track performance with real-time analytics and insights",
      "Pay only for results with our commission-based system",
    ],
    button: "Enter as Business",
    link: "/signup",
  },
  {
    icon: <SquareUser size={24} />,
    gradient: "from-chart-1 to-card",
    title: "For Influencers",
    benefits: [
      "Browse businesses that align with your audience's interests",
      "Generate custom promo codes and earn 5-15% commission on sales",
      "Track earnings and conversions in an intuitive dashboard",
      "Build long-term relationships with brands you love",
    ],
    button: "Enter as Influencer",
    link: "/signup",
  },
  {
    icon: <ShieldUser size={24} />,
    gradient: "from-destructive to-primary",
    title: "For Customers",
    benefits: [
      "Discover exclusive deals from your favorite influencers",
      "Enjoy special discounts not available elsewhere",
      "Explore new brands through trusted recommendations",
      "Support both businesses and creators you love",
    ],
    button: "Signup",
    link: "/signup",
  },
];

export default function Roles() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-18 md:mt-30">
      <div className="text-center mb-10 ">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-foreground mb-8 text-center font-semibold">
          Who Benefits from PromoLink?
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Our platform creates a seamless ecosystem that benefits everyone
          involved in the collaboration economy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
        {roles.map((role, idx) => (
          <Card
            key={idx}
            className="relative group bg-card text-card-foreground shadow-lg py-4 px-4 border h-full flex flex-col "
          >
            <CardHeader>
              <div
                className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-3 mx-auto transform transition group-hover:rotate-6 duration-300`}
              >
                {role.icon}
              </div>
              <CardTitle className="text-xl font-bold text-center mb-4">
                {role.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <ul className="space-y-4 text-muted-foreground mb-6 flex-grow">
                {role.benefits.map((benefit, bidx) => (
                  <li key={bidx} className="flex items-start">
                    <i className="fas fa-check-circle text-primary mr-2"></i>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link href={role.link} className="mt-3 w-full block">
                <Button
                  variant="default"
                  className="w-full flex items-center justify-center gap-2"
                >
                  {role.button}
                  <ArrowRight />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
