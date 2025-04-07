"use client";
import { useUser } from "@/context/User";
import JobLists from "@/components/JobLists";
import { useInfluencers } from "@/context/Influencer";

export default function Home() {
  const { user } = useUser();
  const { influencers } = useInfluencers();

  // Safely check if onboarded exists (defaults to false if undefined)
  const needsOnboarding = user?.role === "business" && !user.onboarded;

  if (needsOnboarding) {
    return (
      <div>
        {influencers.length === 0 ? (
          <div className="flex justify-center items-center h-screen text-2xl font-bold text-gray-500">
            No influencers available. Please check back later.
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen text-2xl font-bold text-gray-500">
            <h1 className="text-3xl font-bold mb-4">
              Welcome to the platform!
            </h1>
            <p className="text-lg mb-4">
              As a business owner, you can explore and connect with influencers.
            </p>
            {influencers.map((influencer) => (
              <div
                key={influencer.name}
                className="p-4 border rounded shadow-md mb-4 w-full max-w-md"
              >
                <img
                  src={influencer.image}
                  alt={influencer.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-semibold">{influencer.name}</h2>
                <p className="text-gray-600">{influencer.bio}</p>
                <p className="text-gray-600">Price: ${influencer.price}</p>
                <p className="text-gray-600">Location: {influencer.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex gap-10 mx-3 lg:mx-20">
      {user?.role === "business" ? (
        <div> welcom bussiness owner</div>
      ) : (
        <JobLists />
      )}
    </div>
  );
}
