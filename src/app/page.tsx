import Nav from "@/components/landingpage/nav";
import Hero from "@/components/landingpage/Hero";
import Trusted from "@/components/landingpage/Trusted";
import Metrics from "@/components/landingpage/Metrics";
import Roles from "@/components/landingpage/Roles";
import How from "@/components/landingpage/How";
import Testimony from "@/components/landingpage/Testimony";
import Cat from "@/components/landingpage/Cat";
import Footer from "@/components/landingpage/Footer";

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden bg-background">
      <Nav />
      <Hero />
      <Metrics />
      <Trusted />

      <Roles />
      <How />
      <Testimony />
      <Cat />
      <Footer />
    </div>
  );
};

export default LandingPage;
