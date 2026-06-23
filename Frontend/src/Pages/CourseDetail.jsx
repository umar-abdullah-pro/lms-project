import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import CourseBanner from "../Components/CourseBanner";
import CourseSyllabus from "../Components/CourseSyllabus";
import CourseSidebar from "../Components/CourseSidebar";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/courses/${id}`
        );
        setCourse(response.data.data);
      } catch (err) {
        setError("Could not load this course. It may have been removed.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <p className="text-red-500 font-bold text-lg">{error}</p>
        <Link to="/" className="text-brand-purple font-bold hover:underline">
          ← Back to courses
        </Link>
      </div>
    );
  }

  const { title, description, price, instructor, lessons = [], createdAt } = course;
  const createdDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-brand-beige">
      <CourseBanner title={title} description={description} instructor={instructor} />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <CourseSyllabus lessons={lessons} />
          <CourseSidebar
            price={price}
            lessons={lessons}
            instructor={instructor}
            createdDate={createdDate}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
