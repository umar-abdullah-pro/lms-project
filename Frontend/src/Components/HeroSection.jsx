import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

const HeroSection = ({ onBrowseClick }) => {
  const { token, scroll } = useAuth();
  return (
    <section className="relative overflow-hidden bg-brand-beige pt-16 pb-24 px-6">
      {/* Background decorative blobs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-brand-coral/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 bg-brand-purple/10 text-brand-purple text-sm font-bold px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 bg-brand-purple rounded-full animate-pulse" />
          300+ courses available now
        </span>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
          Learn anything.{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Grow</span>
            <span className="absolute bottom-1 left-0 w-full h-4 bg-brand-yellow/60 -z-0 rounded" />
          </span>{" "}
          everywhere.
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          Join thousands of students learning from expert instructors on
          Learnly. Pick a course, start today, and transform your skills.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onBrowseClick}
            className="px-8 py-4 font-bold text-white bg-brand-coral rounded-full hover:bg-[#ff554a] transition-all shadow-[0_8px_20px_rgb(255,107,96,0.35)] hover:shadow-[0_12px_28px_rgb(255,107,96,0.45)] hover:-translate-y-0.5 text-lg"
          >
            Browse Courses
          </button>

          {token ? (
            <button
              onClick={onBrowseClick}
              className="px-8 py-4 font-bold text-brand-purple bg-brand-purple/10 rounded-full hover:bg-brand-purple/15 transition-all text-lg"
            >
              Start Learning
            </button>
          ) : (
            <Link
              to="/register"
              className="px-8 py-4 font-bold text-brand-purple bg-brand-purple/10 rounded-full hover:bg-brand-purple/15 transition-all text-lg"
            >
              Join for free →
            </Link>
          )}
        </div>
      </div>

      {/* Stats strip */}
      <div className="max-w-xl mx-auto mt-16 flex items-center justify-center gap-10 relative z-10">
        {[
          { value: "12k+", label: "Students" },
          { value: "300+", label: "Courses" },
          { value: "95%", label: "Satisfaction" },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-10">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-gray-900">{value}</p>
              <p className="text-sm text-gray-400 font-semibold">{label}</p>
            </div>
            {i < 2 && <div className="w-px h-10 bg-gray-200" />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
