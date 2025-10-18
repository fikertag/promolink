import CallToAction from "@/components/call-to-action";
import Features from "@/components/features-4";
import Footer from "@/components/footer";
import IntegrationsSection from "@/components/integrations-3";
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
      <IntegrationsSection />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}

export default page;
