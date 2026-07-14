import { useLoaderData, Form, Link, useNavigation, useSubmit, useLocation } from "react-router-dom";
import CourseCard from "../../components/CourseCard";

const categories = ["All", "Programming", "Design", "Business", "Marketing", "General", "Uncategorized"];

const CourseCatalog = () => {
  const { courses, meta, searchParams } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const location = useLocation();
  
  const isSearching = navigation.state === "loading" && navigation.location?.pathname === location.pathname;

  // Handles page changes without needing a full form submit button
  const handlePageChange = (newPage) => {
    submit(
      { 
        search: searchParams.search, 
        category: searchParams.category, 
        page: newPage 
      }, 
      { method: "GET" }
    );
  };

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <h1 className="mb-8 text-3xl font-extrabold text-gray-900">Course Catalog</h1>

      {/* THE SEARCH & FILTER FORM */}
      <Form className="flex flex-col gap-4 mb-8 sm:flex-row" method="GET">
        <input
          type="text"
          name="search"
          defaultValue={searchParams.search}
          placeholder="Search for courses..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6366f1] focus:outline-none"
        />
        
        <select
          name="category"
          defaultValue={searchParams.category}
          className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6366f1] focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button 
          type="submit" 
          disabled={isSearching}
          className="px-6 py-3 font-bold text-white transition-all bg-[#6366f1] rounded-xl hover:bg-opacity-90 disabled:opacity-50"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </Form>

      {/* THE COURSE GRID */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No courses found matching your criteria.</p>
        ) : (
          courses.map((course, index) => (
            <CourseCard key={course._id} course={course} index={index} />
          ))
        )}
      </div>

      {/* PAGINATION CONTROLS */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => handlePageChange(meta.currentPage - 1)}
            disabled={meta.currentPage === 1 || isSearching}
            className="px-4 py-2 font-bold text-gray-700 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            Previous
          </button>
          
          <span className="font-medium text-gray-600">
            Page {meta.currentPage} of {meta.totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(meta.currentPage + 1)}
            disabled={meta.currentPage === meta.totalPages || isSearching}
            className="px-4 py-2 font-bold text-gray-700 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCatalog;