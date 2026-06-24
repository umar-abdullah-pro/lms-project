import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { _id, title, description, price, instructor, lessons } = course;

  return (
    <Link
      to={`/courses/${_id}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Card Color Banner — uses a gradient derived from the title's length for variety */}
      <div
        className="h-3 w-full"
        style={{
          background:
            title.length % 3 === 0
              ? "linear-gradient(90deg, #695bf4, #9b8ff7)"
              : title.length % 3 === 1
                ? "linear-gradient(90deg, #ff6b60, #ff9a93)"
                : "linear-gradient(90deg, #ffcf54, #ffe099)",
        }}
      />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Price Badge */}
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              price === 0
                ? "bg-green-100 text-green-700"
                : "bg-brand-purple/10 text-brand-purple"
            }`}
          >
            {price === 0 ? "Free" : `Rs.${price}`}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            {lessons?.length ?? 0}{" "}
            {lessons?.length === 1 ? "lesson" : "lessons"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-extrabold text-gray-900 leading-snug group-hover:text-brand-purple transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* Footer: Instructor + Arrow */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center font-bold text-xs">
              {instructor?.name?.charAt(0)?.toUpperCase() ?? "I"}
            </div>
            <span className="text-sm font-semibold text-gray-600">
              {instructor?.name ?? "Instructor"}
            </span>
          </div>
          <span className="text-brand-coral font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            View
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
