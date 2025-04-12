import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SocialMediaPlatform {
  username: string;
  followers: string | number;
}

interface SocialMedia {
  instagram?: SocialMediaPlatform;
  tiktok?: SocialMediaPlatform;
  telegram?: SocialMediaPlatform;
  [key: string]: SocialMediaPlatform | undefined;
}

interface Influencer {
  _id: string;
  name: string;
  image: string;
  bio: string;
  location: string;
  price: number;
  socialMedia: SocialMedia;
  verified: boolean;
}
export function InfluencerDetailPopup({
  influencer,
  open,
  onClose,
}: {
  influencer: Influencer;
  open: boolean;
  onClose: () => void;
}) {
  const socialMedia: SocialMedia =
    typeof influencer.socialMedia === "string"
      ? JSON.parse(influencer.socialMedia)
      : influencer.socialMedia;

  const handleSendMessage = () => {
    console.log("Send message to", influencer.name);
  };

  const handleSendContract = () => {
    console.log("Send contract to", influencer.name);
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className="max-w-2xl mx-auto  rounded-lg shadow-xl">
        <div className="container12 overflow-y-auto">
          <DrawerHeader className="px-4 sm:px-6">
            <DrawerTitle className="text-lg sm:text-xl">
              {influencer.name}&apos;s Profile
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 sm:p-6">
            {/* Profile Image */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                <AvatarImage src={influencer.image} />
                <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>

            {/* Bio */}
            <div className="mb-4 sm:mb-6 text-center">
              <h3 className="font-semibold mb-1 sm:mb-2 text-base sm:text-lg">
                About
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                {influencer.bio?.trim() || "No bio available"}
              </p>
            </div>

            {/* Details - Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-muted/50 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Location
                </p>
                <p className="font-medium text-sm sm:text-base">
                  {influencer.location}
                </p>
              </div>
              <div className="bg-muted/50 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Price
                </p>
                <p className="font-medium text-sm sm:text-base">
                  {influencer.price} Birr
                </p>
              </div>
              <div className="bg-muted/50 p-3 sm:p-4 rounded-lg sm:col-span-2">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Verified
                </p>
                <p className="font-medium text-sm sm:text-base">
                  {influencer.verified ? (
                    <span className="text-green-500">Verified</span>
                  ) : (
                    <span className="text-muted-foreground">Not Verified</span>
                  )}
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="mb-6 sm:mb-8">
              <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                Social Media
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {Object.entries(socialMedia).map(([platform, data]) => {
                  if (!data) return null;

                  return (
                    <div
                      key={platform}
                      className="flex items-center justify-between p-2 sm:p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <span className="capitalize font-medium text-sm sm:text-base">
                          {platform}
                        </span>
                      </div>
                      <span className="text-muted-foreground text-xs sm:text-sm">
                        {data.followers} followers
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons - Stack on mobile, side by side on larger screens */}
            <div className="flex w-full flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
              <button
                onClick={handleSendMessage}
                className="py-2 flex-1/2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                Send Message
              </button>
              <button
                onClick={handleSendContract}
                className="py-2 px-4 flex-1/2 bg-secondary text-primary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm sm:text-base"
              >
                Send Contract
              </button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
