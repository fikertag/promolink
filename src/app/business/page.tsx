import Footer from "@/components/footer";
import InfluencerSection from "@/components/influencers";
import JobPostingForm from "@/components/jobPostingForm";
import Welcome from "@/components/wlcome";

export default function Home() {
  return (
    <div className=" mx-auto ">
      <Welcome />
      <h2 className="text-3xl font-bold mb-4 text-center mt-10">
        Post Your Marketing Job
      </h2>
      <p className="text-gray-600 text-center mb-1">
        Fill out the form below to find the perfect marketers and influencers
        for your business needs
      </p>
      <JobPostingForm />
      <InfluencerSection />
      <Footer />
    </div>
  );
}
