import { HiOutlineBookOpen, HiOutlineCheckCircle, HiOutlineXMark } from 'react-icons/hi2'
import { FaArrowTrendUp } from "react-icons/fa6";

const DashboardHeader = ({ userName = "Asha", stats }) => {
  return (
    <div className="mb-12">
      <h1 className="mb-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
        Welcome back, {userName} <span className="inline-block animate-wave">👋</span>
      </h1>
      <p className="mb-10 text-lg font-medium text-gray-500">
        Here's where things stand today.
      </p>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        
        {/* Stat Card 1: Courses */}
        <div className="flex items-center p-6 bg-white border border-gray-100 shadow-sm rounded-2xl gap-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-purple/10 text-brand-purple">
            <HiOutlineBookOpen className="w-8 h-8 text-purple" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900">{stats?.courses || 0}</div>
            <div className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mt-0.5">Courses Enrolled</div>
          </div>
        </div>

        {/* Stat Card 2: Lessons */}
        <div className="flex items-center p-6 bg-white border border-gray-100 shadow-sm rounded-2xl gap-5">
          <div className="flex items-center justify-center w-12 h-12 text-[#1de9b6] rounded-xl bg-[#e6fcf5]">
            <HiOutlineCheckCircle className="w-8 h-8" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900">{stats?.lessons || 0}</div>
            <div className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mt-0.5">Lessons Completed</div>
          </div>
        </div>

        {/* Stat Card 3: Progress */}
        <div className="flex items-center p-6 bg-white border border-gray-100 shadow-sm rounded-2xl gap-5">
          <div className="flex items-center justify-center w-12 h-12 text-amber-500 rounded-xl bg-amber-50">
            <FaArrowTrendUp className="w-8 h-8"/>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900">{stats?.progress || 0}%</div>
            <div className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mt-0.5">Average Progress</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHeader;