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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900">{stats?.courses || 0}</div>
            <div className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mt-0.5">Courses Enrolled</div>
          </div>
        </div>

        {/* Stat Card 2: Lessons */}
        <div className="flex items-center p-6 bg-white border border-gray-100 shadow-sm rounded-2xl gap-5">
          <div className="flex items-center justify-center w-12 h-12 text-[#1de9b6] rounded-xl bg-[#e6fcf5]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900">{stats?.lessons || 0}</div>
            <div className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mt-0.5">Lessons Completed</div>
          </div>
        </div>

        {/* Stat Card 3: Progress */}
        <div className="flex items-center p-6 bg-white border border-gray-100 shadow-sm rounded-2xl gap-5">
          <div className="flex items-center justify-center w-12 h-12 text-amber-500 rounded-xl bg-amber-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
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