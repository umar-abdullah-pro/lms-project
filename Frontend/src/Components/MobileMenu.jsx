// Frontend/src/Components/MobileMenu.jsx
import { Link } from "react-router-dom";

const MobileMenu = ({ isOpen, user, onLogout, closeMenu }) => {
  if (!isOpen) return null; // If the menu isn't open, render absolutely nothing!

  return (
    <div className="absolute top-0 left-0 w-full h-screen flex flex-col pt-24 px-8 bg-brand-beige z-40 md:hidden">
      <div className="flex flex-col gap-6 text-xl">
        {user && (
          <Link
            to="/all-courses"
            onClick={closeMenu}
            className="font-bold text-gray-800 border-b border-gray-200 pb-4"
          >
            Browse courses
          </Link>
        )}
        {user?.role === "student" && (
          <Link
            to="/dashboard"
            onClick={closeMenu}
            className="font-bold text-gray-800 border-b border-gray-200 pb-4"
          >
            Dashboard
          </Link>
        )}
        {user?.role === "instructor" && (
          <Link
            to="/create-course"
            onClick={closeMenu}
            className="font-bold text-gray-800 border-b border-gray-200 pb-4"
          >
            Add New Course
          </Link>
        )}

        {user ? (
          <>
            <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mt-2">
              <div className="w-10 h-10 overflow-hidden bg-white border-2 rounded-full border-brand-purple/20">
                <img
                  src={
                    user.avatar ||
                    `https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}`
                  }
                  alt={user.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="block font-extrabold text-gray-900"
                >
                  {user.name}
                </Link>
                <span className="text-sm font-semibold uppercase tracking-widest text-brand-purple">
                  {user.role}
                </span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="text-left font-bold text-red-500 pb-4"
            >
              Log out
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-6 mt-4">
            <Link
              to="/login"
              onClick={closeMenu}
              className="font-bold text-gray-800 border-b border-gray-200 pb-4"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={closeMenu}
              className="text-center px-6 py-4 font-bold text-white bg-brand-coral rounded-full shadow-lg"
            >
              Get started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
