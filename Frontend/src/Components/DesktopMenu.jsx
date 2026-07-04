// Frontend/src/Components/DesktopMenu.jsx
import { Link } from "react-router-dom";

const DesktopMenu = ({ user, onLogout }) => {
  return (
    <div className="hidden md:flex items-center gap-8">
      {user && (
        <Link
          to="/all-courses"
          className="font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          Browse courses
        </Link>
      )}
      {user?.role === "student" && (
        <Link
          to="/dashboard"
          className="font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          Dashboard
        </Link>
      )}
      {user?.role === "instructor" && (
        <Link
          to="/create-course"
          className="font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          Add New Course
        </Link>
      )}

      <div className="border-l pl-6 border-gray-300">
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="flex items-center gap-3 p-1.5 pr-5 transition-all border border-gray-100 rounded-full bg-gray-50 hover:bg-white hover:shadow-sm"
            >
              <div className="flex-shrink-0 w-10 h-10 overflow-hidden bg-white border-2 rounded-full border-brand-purple/20">
                <img
                  src={
                    user.avatar ||
                    `https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}`
                  }
                  alt={user.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col items-start justify-center">
                <span className="text-sm font-extrabold leading-tight text-gray-900">
                  {user.name.split(" ")[0]}
                </span>
                <span className="text-[11px] font-bold tracking-widest uppercase text-brand-purple">
                  {user.role}
                </span>
              </div>
            </Link>
            <button
              onClick={onLogout}
              title="Logout"
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 font-bold text-white bg-brand-coral rounded-full hover:-translate-y-0.5 transition-all shadow-lg"
            >
              Get started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopMenu;
