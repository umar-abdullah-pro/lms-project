import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import CallToAction from "./CallToAction";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-brand-beige">
      <HeroSection />
      <FeaturesSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
