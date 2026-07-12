import { HiOutlineBookOpen } from "react-icons/hi2";
const Footer = () => {
  return (
    <footer className="px-6 py-12 mx-auto mt-10 border-t border-gray-200 max-w-7xl md:px-12">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row text-gray-400 font-bold text-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-brand-purple">
            <HiOutlineBookOpen className="w-3 h-3 text-white" />
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
