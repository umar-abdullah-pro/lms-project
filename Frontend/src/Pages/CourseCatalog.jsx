import CourseCard from "../Components/CourseCard";
import { useLoaderData } from "react-router-dom";

const CourseCatalog = () => {
  const { allCourses = [] } = useLoaderData()

  return (
    <section id="courses" className="px-6 py-20 mx-auto max-w-7xl md:px-12">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Pick up a course
        </h2>
        <a
          href="#courses"
          className="font-bold transition-colors text-brand-purple hover:text-indigo-700"
        >
          See all →
        </a>
      </div>

      {allCourses?.length === 0 ? (
        <p className="py-10 text-lg font-medium text-gray-500">
          No courses are published yet — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allCourses?.map((course, index) => (
            <CourseCard key={course._id} course={course} index={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CourseCatalog;
