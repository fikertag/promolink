import Nav from "@/components/landingpage/nav";
import Hero from "@/components/landingpage/Hero";
import Trusted from "@/components/landingpage/Trusted";
import Metrics from "@/components/landingpage/Metrics";
import Roles from "@/components/landingpage/Roles";
import How from "@/components/landingpage/How";
import Testimony from "@/components/landingpage/Testimony";
import Cat from "@/components/landingpage/Cat";
import Footer from "@/components/landingpage/Footer";
import HeroSection from "@/components/heroSection";
import StatsCountDemo from "@/components/ui/statusCount";
import FeaturesSection from "@/components/features";
import FeatureSteps from "@/components/ui/feature-2";
import { Marquee } from "@/components/ui/marquee";
import Testimonials from "@/components/ui/testimonials-marquee";
import CTA1 from "@/components/ui/contactus";
import LandingFooter from "@/components/landingFooter";

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden bg-background">
      <HeroSection />
      <StatsCountDemo />
      <FeaturesSection />
      <FeatureSteps />
      <Testimonials />
      <Cat />
      <CTA1 />
      <LandingFooter />
      <Nav />
      {/* 
      <Hero />
      <Metrics />
      <Trusted />

      <Roles />
      <How />
      <Testimony />
      <Cat />   <Footer />
       */}
    </div>
  );
};

export default LandingPage;
