import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="px-6 pt-12 pb-24 mx-auto max-w-7xl md:px-12 md:pt-20 lg:pb-32">
      <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-8">
        {/* Left Text Content */}
        <div className="w-full lg:w-1/2">
          <p className="mb-6 text-sm font-bold tracking-widest text-gray-400 uppercase">
            For Students, Not Spreadsheets
          </p>
          <h1 className="mb-6 text-5xl font-extrabold leading-[1.1] text-gray-900 md:text-6xl lg:text-7xl">
            Learn things that actually{" "}
            <span className="relative inline-block">
              stick,
              <span className="absolute bottom-1 left-0 w-full h-4 bg-brand-yellow -z-10 rounded-full"></span>
            </span>
            <br />
            one short lesson at a time.
          </h1>
          <p className="max-w-lg mb-10 text-lg font-medium leading-relaxed text-gray-500 md:text-xl">
            Learnly breaks courses into bite-sized lessons and remembers exactly
            where you left off — so studying feels like progress, not a chore.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 text-lg font-bold text-white transition-all bg-brand-coral rounded-full hover:bg-[#ff554a] shadow-[0_8px_20px_rgb(255,107,96,0.3)] hover:-translate-y-0.5 text-center"
            >
              Get started free →
            </Link>
            <a
              href="#courses"
              className="w-full sm:w-auto px-8 py-3.5 text-lg font-bold text-gray-800 transition-all bg-white border-2 border-gray-200 rounded-full hover:border-gray-300 hover:bg-gray-50 text-center"
            >
              Browse courses
            </a>
          </div>
        </div>

        {/* Right CSS Illustration (The Notepad) */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full max-w-md mx-auto mt-10 lg:mt-0">
            <div className="absolute top-4 left-4 w-full h-[400px] bg-white/40 rounded-[2.5rem] -rotate-3 border border-gray-100/50"></div>
            <div className="relative w-full h-[400px] bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 flex flex-col overflow-hidden">
              <div className="absolute top-0 bottom-0 flex flex-col justify-center py-12 border-r left-6 w-9 border-brand-purple/10 gap-7">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-full border-2 border-brand-purple/20 bg-white -ml-[7px]"
                  ></div>
                ))}
              </div>
              <div className="flex flex-col gap-8 mt-8 pl-14">
                <div className="w-3/4 h-3.5 rounded-full bg-brand-yellow"></div>
                <div className="w-full h-3.5 rounded-full bg-gray-100"></div>
                <div className="w-5/6 h-3.5 rounded-full bg-[#1de9b6]"></div>
                <div className="w-4/5 h-3.5 rounded-full bg-gray-100"></div>
                <div className="w-full h-3.5 rounded-full bg-gray-100"></div>
              </div>
            </div>

            {/* Floating UI Elements */}
            <div className="absolute top-1/3 -left-8 md:-left-16 bg-white rounded-2xl p-4 shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-gray-50 flex flex-col gap-0.5 animate-[bounce_4s_infinite]">
              <div className="text-[10px] font-black tracking-widest text-brand-coral uppercase">
                Streak
              </div>
              <div className="text-lg font-extrabold text-gray-900">6 days</div>
            </div>
            <div className="absolute bottom-1/4 -right-4 md:-right-12 bg-white rounded-2xl p-4 shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-gray-50 flex items-center gap-3 animate-[bounce_5s_infinite_1s]">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e6fcf5] text-[#1de9b6]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div>
                <div className="text-sm font-extrabold text-gray-900">
                  Lesson 4
                </div>
                <div className="text-xs font-bold text-gray-400">
                  Marked complete
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
