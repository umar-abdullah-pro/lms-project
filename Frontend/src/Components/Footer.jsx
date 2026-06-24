const Footer = () => {
  return (
    <footer className="px-6 py-12 mx-auto mt-10 border-t border-gray-200 max-w-7xl md:px-12">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row text-gray-400 font-bold text-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-brand-purple">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <span className="text-gray-900 tracking-tight">Learnly</span>
        </div>
        <p className="text-center">
          Made for students who'd rather be learning than scrolling.
        </p>
        <p>© 2026 Learnly</p>
      </div>
    </footer>
  );
};

export default Footer;