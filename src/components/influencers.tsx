import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star } from "lucide-react";

const influencers = [
  {
    id: 1,
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg",
    specialty: "Social Media Marketing",
    rating: 4.9,
    reviews: 78,
    verified: true,
    tags: ["Instagram", "TikTok", "Content Creation"],
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg",
    specialty: "SEO & Content Strategy",
    rating: 4.8,
    reviews: 124,
    verified: true,
    tags: ["SEO", "Content Marketing", "Analytics"],
  },
  {
    id: 3,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    specialty: "Video Marketing",
    rating: 4.7,
    reviews: 56,
    verified: true,
    tags: ["YouTube", "Video Production", "Storytelling"],
  },
  {
    id: 4,
    name: "David Williams",
    avatar: "/placeholder.svg",
    specialty: "Paid Advertising",
    rating: 4.9,
    reviews: 93,
    verified: true,
    tags: ["Google Ads", "Facebook Ads", "PPC"],
  },
];

const InfluencerCard = ({
  influencer,
}: {
  influencer: (typeof influencers)[0];
}) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={influencer.avatar} alt={influencer.name} />
            <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <h3 className="font-semibold text-lg">{influencer.name}</h3>
              {influencer.verified && (
                <CheckCircle className="h-4 w-4 ml-1 text-blue-500" />
              )}
            </div>
            <p className="text-muted-foreground">{influencer.specialty}</p>
            <div className="flex items-center justify-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">{influencer.rating}</span>
              <span className="text-muted-foreground text-sm ml-1">
                ({influencer.reviews} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {influencer.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>

        <Button variant="outline" className="w-full">
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

const InfluencerSection = () => {
  return (
    <section className="py-16 bg-white" id="influencers">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse Top Influencers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with verified marketing professionals and influencers who
            can help take your brand to the next level
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {influencers.map((influencer) => (
            <InfluencerCard key={influencer.id} influencer={influencer} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button size="lg">View All Influencers</Button>
        </div>
      </div>
    </section>
  );
};

export default InfluencerSection;
