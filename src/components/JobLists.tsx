import JobPreview from "@/components/JobPreview";
import { SocialPlatform } from "@/components/SocialIcons"; // adjust path

const jobData: {
  postedTime: string;
  title: string;
  price: string;
  description: string;
  tags: SocialPlatform[];
  location: string;
}[] = [
  {
    postedTime: "Posted 1 hour ago",
    title: "Looking for Social Media Promoter",
    price: "100 birr",
    description:
      "We are seeking dedicated and articulate Social Media Promoters to join our marketing team. You will be responsible for ...",
    tags: ["tiktok", "instagram", "facebook", "telegram"],
    location: "Tecno",
  },
  {
    postedTime: "Posted 2 hours ago",
    title: "Hiring Influencers for Product Promotion",
    price: "200 birr",
    description:
      "Join our team as an influencer to promote our latest products. We are looking for individuals with a strong social media presence.",
    tags: ["instagram", "youtube", "twitter"],
    location: "Main",
  },
  {
    postedTime: "Posted 3 hours ago",
    title: "Brand Ambassadors Needed",
    price: "150 birr",
    description:
      "We are looking for brand ambassadors to represent our brand at various events and on social media platforms.",
    tags: ["instagram", "facebook"],
    location: "Tecno",
  },
  {
    postedTime: "Posted 4 hours ago",
    title: "Content Creators for Social Media",
    price: "120 birr",
    description:
      "We need content creators to develop engaging content for our social media channels. Experience with video editing is a plus.",
    tags: ["youtube", "tiktok"],
    location: "Agri",
  },
];

export default function JobLists() {
  return (
    <div className="mx-auto  h-[calc(100vh-1rem)] overflow-y-scroll container1 pb-10 w-full pt-7 ">
      <h1 className="text-2xl font-semibold mb-10 px-3">Available Campaigns</h1>
      <div className="flex flex-col gap-1">
        <JobPreview job={jobData[0]} />
        <JobPreview job={jobData[1]} />
        <JobPreview job={jobData[2]} />
        <JobPreview job={jobData[3]} />
        <JobPreview job={jobData[0]} />
        <JobPreview job={jobData[1]} />
        <JobPreview job={jobData[2]} />
        <JobPreview job={jobData[3]} />
        <JobPreview job={jobData[0]} />
      </div>
    </div>
  );
}
