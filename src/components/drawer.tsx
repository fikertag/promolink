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
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className="max-w-2xl w-full mx-auto rounded-lg shadow-xl">
        <div className="max-h-[100vh] overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle className="text-xl">
              {influencer.name}&apos;s Profile
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-6">
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src={influencer.image} />
                <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>

            {/* Bio */}
            <div className="mb-6 text-center">
              <h3 className="font-semibold mb-2 text-lg">About</h3>
              <p className="text-muted-foreground">
                {influencer.bio?.trim() || "No bio available"}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{influencer.location}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-medium">{influencer.price} Birr</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="font-medium">
                  {influencer.verified ? (
                    <span className="text-green-500">Verified</span>
                  ) : (
                    <span className="text-muted-foreground">Not Verified</span>
                  )}
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold mb-4 text-lg">Social Media</h3>
              <div className="space-y-3">
                {Object.entries(
                  typeof influencer.socialMedia === "string"
                    ? JSON.parse(influencer.socialMedia)
                    : influencer.socialMedia
                ).map(([platform]) => (
                  <div
                    key={platform}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="capitalize font-medium">{platform}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {/* {data?.followers?.toLocaleString()} followers */}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
