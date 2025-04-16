"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// import { useToast } from "@/components/ui/use-toast";
import { useJobs } from "@/context/Job";

const JobPostingForm = () => {
  // const { toast } = useToast();
  const { addJob } = useJobs();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "Tecno",
    socialMedia: [] as Array<{
      platform: "instagram" | "tiktok" | "telegram";
    }>,
  });

  const [selectedPlatforms, setSelectedPlatforms] = useState<
    Array<"instagram" | "tiktok" | "telegram">
  >([]);

  const handlePlatformToggle = (
    platform: "instagram" | "tiktok" | "telegram"
  ) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Prepare job data with string types only
      const jobData = {
        title: formData.title,
        description: formData.description,
        price: formData.price.toString(), // Convert to string if needed
        location: formData.location,
        socialMedia: selectedPlatforms.map((platform) => ({ platform })), // Array of {platform: string}
      };

      await addJob(jobData);
    } catch (error) {
      console.error("Error posting job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-10 bg-brand-gray" id="post-job">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-custom">
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Instagram Marketing for our shop"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your job requirements in detail..."
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Budget (Birr) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      placeholder="100"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      disabled
                      placeholder="Addis Ababa, Ethiopia"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Required Social Media Platforms *</Label>
                  <div className="flex flex-wrap gap-2">
                    {(["instagram", "tiktok", "telegram"] as const).map(
                      (platform) => (
                        <Button
                          className="text-xs sm:text-base px-1.5"
                          key={platform}
                          type="button"
                          variant={
                            selectedPlatforms.includes(platform)
                              ? "default"
                              : "outline"
                          }
                          onClick={() => handlePlatformToggle(platform)}
                        >
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </Button>
                      )
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || selectedPlatforms.length === 0}
                >
                  {isSubmitting ? "Posting..." : "Post Job"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JobPostingForm;
