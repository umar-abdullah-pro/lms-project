import { Link } from "react-router-dom";
import { HiOutlineClock } from "react-icons/hi2";

const CourseCard = ({ course, index }) => {
  // Creating dynamic pastel colors based on index
  const colors = [
    {
      bg: "bg-[#ffeae5]",
      text: "text-brand-coral",
      pill: "bg-[#ffedec] text-[#ff7970]",
    },
    {
      bg: "bg-[#eef0ff]",
      text: "text-brand-purple",
      pill: "bg-[#f0f2ff] text-[#7b6df5]",
    },
    {
      bg: "bg-[#fff5d6]",
      text: "text-[#d99f00]",
      pill: "bg-[#fff8e1] text-[#d99f00]",
    },
  ];
  const theme = colors[index % 3];

  const fallbackImage ="https://placehold.co/600x400/f3f4f6/6b7280?text=No+Thumbnail";
  
  return (
    <Link
      to={`/course/${course._id}`}
      className="flex flex-col overflow-hidden transition-all bg-white border border-gray-100 group rounded-4xl hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <img
          src={course.thumbnail || fallbackImage}
          alt={course.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-bold text-gray-700 uppercase bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
            {course.category || "Uncategorized"}
          </span>
        </div>
      </div>
      <div className="flex flex-col grow p-8">
        <div
          className={`inline-flex px-3 py-1 mb-4 text-xs font-bold rounded-full w-fit ${theme.pill}`}
        >
          {course.instructor?.name || "Instructor"}
        </div>
        <h3 className="mb-3 text-2xl font-extrabold text-gray-900 transition-colors group-hover:text-brand-purple">
          {course.title}
        </h3>
        <p className="grow mb-8 font-medium text-gray-500 line-clamp-2">
          {course.description}
        </p>
        <div className="flex items-center justify-between pt-6 mt-auto border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
            <HiOutlineClock className="w-5 h-5" />
            {course.lessons?.length || 0} LESSONS
          </div>
          <div className="text-lg font-extrabold text-brand-purple">
            {course.price === 0 ? "Free" : `Rs.${course.price}`}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
