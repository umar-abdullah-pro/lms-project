import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const CallToAction = () => {
  const { user } = useAuth();

  return (
    <section className="px-6 py-12 mx-auto max-w-7xl md:px-12">
      <div className="flex flex-col items-center justify-center p-12 text-center shadow-lg bg-brand-purple rounded-[3rem] md:p-20">
        <h2 className="mb-8 text-4xl font-extrabold text-white md:text-5xl">
          Ready to start your next
          <span className="relative">
            streak?
            <span className="absolute bottom-1 left-0 w-full h-3 bg-white/30 rounded-full -z-10"></span>
          </span>
        </h2>
        {!user ? (
          <Link
            to="/register"
            className="px-8 py-4 text-lg font-bold text-white transition-all bg-brand-coral rounded-full hover:bg-[#ff554a] shadow-[0_8px_20px_rgb(255,107,96,0.3)] hover:shadow-[0_10px_25px_rgb(255,107,96,0.4)] hover:-translate-y-0.5"
          >
            Create your free account
          </Link>
        ) : (
          <Link
            to="/all-courses"
            className="px-8 py-4 text-lg font-bold text-white transition-all bg-brand-coral rounded-full hover:bg-[#ff554a] shadow-[0_8px_20px_rgb(255,107,96,0.3)] hover:shadow-[0_10px_25px_rgb(255,107,96,0.4)] hover:-translate-y-0.5"
          >
            Let's Start Learning!
          </Link>
        )}
      </div>
    </section>
  );
};

export default CallToAction;
