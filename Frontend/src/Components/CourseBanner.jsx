import { Link } from "react-router-dom";

const CourseBanner = ({ title, description, instructor }) => {
  return (
    <div className="bg-brand-purple">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-semibold transition-colors mb-6"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          All Courses
        </Link>

        {/* Title + Description */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            {title}
          </h1>
          <p className="text-white/75 text-lg leading-relaxed font-medium">
            {description}
          </p>

          {/* Instructor strip */}
          <div className="flex items-center gap-3 mt-6">
            <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">
              {instructor?.name?.charAt(0)?.toUpperCase() ?? "I"}
            </div>
            <div>
              <p className="text-white font-bold">
                {instructor?.name ?? "Unknown Instructor"}
              </p>
              <p className="text-white/50 text-sm">{instructor?.email ?? ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBanner;
