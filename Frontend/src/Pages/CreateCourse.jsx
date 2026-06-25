import CreateCourseHeader from "../components/CreateCourseHeader";
import CreateCourseForm from "../components/CreateCourseForm";
import Footer from "../components/Footer";

const CreateCourse = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-brand-beige">
      <div className="flex-grow w-full px-6 py-12 mx-auto max-w-3xl md:px-12 md:py-20">
        <CreateCourseHeader />
        <CreateCourseForm />
      </div>
      <Footer />
    </div>
  );
};

export default CreateCourse;
