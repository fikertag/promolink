import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
  FaTelegram,
} from "react-icons/fa";

// Declare the type (or import if you moved it elsewhere)
export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "twitter"
  | "linkedin"
  | "tiktok"
  | "youtube"
  | "telegram";

// The iconMap object, with platforms as keys and React Components as values
const iconMap: Record<
  SocialPlatform,
  React.ComponentType<{ size?: number; color?: string }>
> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  telegram: FaTelegram,
};

// Add brand colors for each platform
const brandColors: Record<SocialPlatform, string> = {
  // instagram: "#C1355E", // Dimmed Instagram pink/red
  // facebook: "#145DA0", // Dimmed Facebook blue
  // twitter: "#0F81C7", // Dimmed Twitter blue
  // linkedin: "#005582", // Dimmed LinkedIn blue
  // tiktok: "#222222", // Dimmed TikTok black
  // youtube: "#CC0000", // Dimmed YouTube red
  // telegram: "#0077A8", // Dimmed Telegram blue
  instagram: "#E4405F", // Normal Instagram pink/red
  facebook: "#1877F2", // Normal Facebook blue
  twitter: "#1DA1F2", // Normal Twitter blue
  linkedin: "#0077B5", // Normal LinkedIn blue
  tiktok: "#000000", // Normal TikTok black
  youtube: "#FF0000", // Normal YouTube red
  telegram: "#0088CC", // Normal Telegram blue
};

type SocialIconProps = {
  platform: SocialPlatform;
  size?: number;
  color?: string; // Optional override
};

const SocialIcon: React.FC<SocialIconProps> = ({
  platform,
  size = 15,
  color,
}) => {
  const IconComponent = iconMap[platform];

  if (!IconComponent) return null;

  const iconColor = color || brandColors[platform]; // Use custom color or fallback to brand color

  return <IconComponent size={size} color={iconColor} />;
};

export default SocialIcon;
