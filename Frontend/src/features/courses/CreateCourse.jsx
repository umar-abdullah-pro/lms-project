import CreateCourseForm from "./CreateCourseForm";
import Footer from "../../components/Footer";

const CreateCourse = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-brand-beige">
        <CreateCourseForm />
      <Footer />
    </div>
  );
};

export default CreateCourse;
