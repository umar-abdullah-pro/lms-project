import { useState, useEffect } from "react";
import axios from "axios";

// Importing our Lego Blocks
import HeroSection from "../Components/HeroSection";
import CourseCatalog from "../Components/CourseCatalog";
import FeaturesSection from "../Components/FeaturesSection";
import CallToAction from "../Components/CallToAction";
import Footer from "../Components/Footer";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/courses");
        console.log(response)
        setCourses(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="w-full min-h-screen bg-brand-beige">
      <HeroSection />
      <CourseCatalog courses={courses} loading={loading} />
      <FeaturesSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
