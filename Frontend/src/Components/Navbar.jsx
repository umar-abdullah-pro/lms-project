// Frontend/src/Components/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

import {
  HiOutlineBookOpen,
  HiOutlineBars3,
  HiOutlineXMark,
} from "react-icons/hi2";

// Import your newly extracted components!
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 py-4 px-6 md:px-12 bg-brand-beige border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 z-50"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center shadow-sm">
            <HiOutlineBookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Learn
            <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">
              ly
            </span>
          </span>
        </Link>

        {/* 💻 DESKTOP MENU */}
        <DesktopMenu user={user} onLogout={handleLogout} />

        {/* 📱 MOBILE HAMBURGER BUTTON */}
        <button
          className="md:hidden p-2 text-gray-600 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <HiOutlineXMark className="w-7 h-7" />
          ) : (
            <HiOutlineBars3 className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* 📱 MOBILE MENU SLIDE-DOWN */}
      <MobileMenu
        isOpen={isMenuOpen}
        user={user}
        onLogout={handleLogout}
        closeMenu={() => setIsMenuOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
