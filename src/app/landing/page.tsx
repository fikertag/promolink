import CallToAction from "@/components/call-to-action";
import Features from "@/components/features-4";
import Footer from "@/components/footer";
import HeroSection from "@/components/landing/hero-section";
import Feature3 from "@/components/mvpblocks/feature-3";
import Testimonials from "@/components/testimonials";
import StatsCount from "@/components/ui/statscount";

function page() {
  return (
    <>
      <HeroSection />
      <StatsCount />
      <Features />
      <Feature3 />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}

export default page;
