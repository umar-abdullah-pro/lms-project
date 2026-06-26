import { useState, useEffect } from "react";
import axios from "axios";

// Importing our Lego Blocks
import HeroSection from "../Components/HeroSection";
import FeaturesSection from "../Components/FeaturesSection";
import CallToAction from "../Components/CallToAction";
import Footer from "../Components/Footer";

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
