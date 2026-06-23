import CourseCard from './CourseCard';
import LoadingSpinner from './LoadingSpinner';

const CourseCatalog = ({ courses, isLoading, error, searchQuery, onSearchChange }) => {
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      {/* Section Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">All Courses</h2>
          <p className="text-gray-400 font-medium mt-1">
            {isLoading
              ? 'Fetching the latest courses...'
              : `${filteredCourses.length} course${filteredCourses.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/40 focus:border-brand-purple transition-colors font-medium text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* States: Loading / Error / Empty / Grid */}
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center py-24">
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-xl font-extrabold text-gray-800">
            {searchQuery ? `No results for "${searchQuery}"` : 'No courses yet'}
          </p>
          <p className="text-gray-400 font-medium max-w-xs">
            {searchQuery ? 'Try a different keyword.' : 'Check back soon — instructors are creating courses right now!'}
          </p>
          {searchQuery && (
            <button onClick={() => onSearchChange('')} className="mt-2 text-brand-purple font-bold hover:underline">
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CourseCatalog;
