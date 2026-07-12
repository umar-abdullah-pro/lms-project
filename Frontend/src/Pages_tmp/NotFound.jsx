import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { FiCompass } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-80px)] bg-brand-beige">
      {/* Centered Content Container */}
      <div className="flex flex-col items-center justify-center grow px-6 text-center">
        {/* Yellow Compass Icon */}
        <div className="flex items-center justify-center w-20 h-20 mb-8 rounded-full bg-[#fff8e1] text-[#d99f00]">
          <FiCompass className="w-10 h-10" />
        </div>

        {/* Text content */}
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl">
          This page wandered off
        </h1>
        <p className="max-w-md mb-10 text-lg font-medium text-gray-500">
          Whatever you were looking for isn't here. Let's get you back on track.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="px-8 py-4 text-lg font-bold text-white transition-all transform rounded-full bg-brand-coral hover:bg-[#ff554a] shadow-[0_8px_20px_rgb(255,107,96,0.3)] hover:shadow-[0_10px_25px_rgb(255,107,96,0.4)] hover:-translate-y-0.5"
        >
          Back to home
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
