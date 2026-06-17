import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Checking if the user has a VIP pass
  const token = localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-brand-beige py-4 px-6 md:px-12 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LEFT: The Learnly Logo */}
        <Link to="/" className="flex items-center gap-2 z-50" onClick={() => setIsMenuOpen(false)}>
          <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Learn<span className="underline decoration-brand-yellow decoration-4 underline-offset-4">ly</span>
          </span>
        </Link>

        {/* RIGHT: Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-semibold text-gray-600 hover:text-gray-900 transition-colors">
            Browse courses
          </Link>
          
          {token ? (
            /* Logged IN State */
            <div className="flex items-center gap-6 border-l pl-6 border-gray-300">
              <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                Dashboard
              </Link>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center font-bold text-sm">
                  U
                </div>
                <span className="font-semibold text-gray-800">My Account</span>
                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all" title="Logout">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
              </div>
            </div>
          ) : (
            /* Logged OUT State */
            <div className="flex items-center gap-6 border-l pl-6 border-gray-300">
              <Link to="/login" className="font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                Log in
              </Link>
              <Link to="/register" className="px-6 py-2.5 font-bold text-white transition-all bg-brand-coral rounded-full hover:bg-[#ff554a] shadow-[0_4px_14px_rgb(255,107,96,0.3)] hover:shadow-[0_6px_20px_rgb(255,107,96,0.4)] hover:-translate-y-0.5">
                Get started
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE: Hamburger Button */}
        <button 
          className="md:hidden p-2 text-gray-600 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* MOBILE: Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-brand-beige z-40 flex flex-col pt-24 px-8 md:hidden">
          <div className="flex flex-col gap-6 text-xl">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="font-bold text-gray-800 border-b border-gray-200 pb-4">Browse courses</Link>
            
            {token ? (
              <>
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="font-bold text-gray-800 border-b border-gray-200 pb-4">Dashboard</Link>
                <button onClick={handleLogout} className="text-left font-bold text-red-500 pb-4">Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="font-bold text-gray-800 border-b border-gray-200 pb-4">Log in</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="text-center px-6 py-4 mt-4 font-bold text-white bg-brand-coral rounded-full shadow-lg">
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;