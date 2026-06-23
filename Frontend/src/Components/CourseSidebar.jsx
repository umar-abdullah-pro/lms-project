const META_ICONS = {
  lessons: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  instructor: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  published: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
};

const CourseSidebar = ({ price, lessons, instructor, createdDate }) => {
  const metaItems = [
    { key: 'lessons',    label: 'Lessons',    value: `${lessons.length} lesson${lessons.length !== 1 ? 's' : ''}` },
    { key: 'instructor', label: 'Instructor',  value: instructor?.name ?? 'Unknown' },
    { key: 'published',  label: 'Published',   value: createdDate },
  ];

  return (
    <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-24">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
        {/* Price header */}
        <div className="bg-brand-beige px-6 py-5 border-b border-gray-100">
          <p className="text-4xl font-extrabold text-gray-900">
            {price === 0 ? <span className="text-green-600">Free</span> : `Rs.${price}`}
          </p>
        </div>

        <div className="px-6 py-6 flex flex-col gap-5">
          {/* Enroll CTA */}
          <button className="w-full py-4 font-bold text-white bg-brand-coral rounded-full hover:bg-[#ff554a] transition-all shadow-[0_8px_20px_rgb(255,107,96,0.3)] hover:shadow-[0_12px_28px_rgb(255,107,96,0.4)] hover:-translate-y-0.5">
            Enroll Now
          </button>
          <p className="text-center text-xs text-gray-400 font-medium -mt-2">Enrollment coming soon!</p>

          {/* Course meta items */}
          <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
            {metaItems.map(({ key, label, value }) => (
              <div key={key} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={META_ICONS[key]} />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-bold text-gray-800">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;
