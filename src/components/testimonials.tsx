import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Mekdes Tadesse",
    role: "E-commerce Store Owner",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face",
    quote:
      "Mykalat helped us grow our online sales by 300% in just 6 months. The influencer partnerships brought authentic traffic that converted into loyal customers.",
  },
  {
    name: "Dawit Bekele",
    role: "Marketing Director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    quote:
      "Building our brand awareness was a challenge until we found Mykalat. The platform connected us with influencers who truly understood our vision and reached our target audience effectively.",
  },
  {
    name: "Senait Gebremariam",
    role: "Fashion Brand Founder",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    quote:
      "The goal tracking features are incredible. We can set specific marketing objectives and monitor real-time performance across all our influencer campaigns. It's transformed how we measure ROI.",
  },
  {
    name: "Yohannes Haile",
    role: "Tech Startup CEO",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    quote:
      "Mykalat made brand building accessible for our startup. We went from unknown to recognized in our niche within months, thanks to strategic influencer collaborations.",
  },
  {
    name: "Rahel Mengistu",
    role: "Beauty Brand Manager",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
    quote:
      "The analytics dashboard helps us track every aspect of our marketing goals. We can see exactly how influencer partnerships contribute to brand growth and customer acquisition.",
  },
  {
    name: "Solomon Assefa",
    role: "Fitness Equipment Manufacturer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
    quote:
      "Since using Mykalat, our business has scaled significantly. The platform's goal-setting tools and performance tracking have helped us optimize our influencer marketing strategy for maximum growth.",
  },
];

const chunkArray = (
  array: Testimonial[],
  chunkSize: number
): Testimonial[][] => {
  const result: Testimonial[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const testimonialChunks = chunkArray(
  testimonials,
  Math.ceil(testimonials.length / 3)
);

export default function WallOfLoveSection() {
  return (
    <section>
      <div className="py-12 md:py-20" id="Testimonials">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-normal">
              Success Stories from Our Partners
            </h2>
            <p className="mt-6">
              See how businesses are growing, building brands, and achieving
              their marketing goals with Mykalat.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {testimonialChunks.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className="space-y-3">
                {chunk.map(({ name, role, quote, image }, index) => (
                  <Card key={index}>
                    <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                      <Avatar className="size-9">
                        <AvatarImage
                          alt={name}
                          src={image}
                          loading="lazy"
                          width="120"
                          height="120"
                        />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-medium">{name}</h3>

                        <span className="text-muted-foreground block text-sm tracking-wide">
                          {role}
                        </span>

                        <blockquote className="mt-3">
                          <p className="text-gray-700 dark:text-gray-300">
                            {quote}
                          </p>
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
