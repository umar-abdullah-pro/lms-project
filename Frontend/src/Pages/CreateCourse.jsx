import CreateCourseHeader from "../Components/CreateCourseHeader";
import CreateCourseForm from "../Components/CreateCourseForm";
import Footer from "../Components/Footer";

const CreateCourse = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-brand-beige">
      <div className="grow w-full px-6 py-12 mx-auto max-w-3xl md:px-12 md:py-20">
        <CreateCourseHeader />
        <CreateCourseForm />
      </div>
      <Footer />
    </div>
  );
};

export default CreateCourse;
