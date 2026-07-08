import { HiOutlineClock, HiOutlineArrowPath, HiOutlineSparkles } from 'react-icons/hi2'

const FeaturesSection = () => {
  return (
    <section className="px-6 py-20 mx-auto max-w-7xl md:px-12">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-extrabold text-gray-900">
          Built so you don't burn out
        </h2>
        <p className="text-lg font-medium text-gray-500">
          No streak shame, no walls of text — just steady, calm progress.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-4xl">
          <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-xl bg-amber-50 text-amber-500">
            <HiOutlineClock className="w-6 h-6" />
          </div>
          <h3 className="mb-3 text-xl font-extrabold text-gray-900">
            Bite-sized lessons
          </h3>
          <p className="font-medium leading-relaxed text-gray-500">
            Most lessons run 5–10 minutes, so you can make real progress between
            classes — not just before exams.
          </p>
        </div>
        <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-4xl">
          <div className="flex items-center justify-center w-12 h-12 mb-6 text-[#1de9b6] rounded-xl bg-[#e6fcf5]">
            <HiOutlineArrowPath className="w-6 h-6" />
          </div>
          <h3 className="mb-3 text-xl font-extrabold text-gray-900">
            Pick up instantly
          </h3>
          <p className="font-medium leading-relaxed text-gray-500">
            Your progress saves itself. Open a course and you're back exactly
            where you stopped, no scrolling required.
          </p>
        </div>
        <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-4xl">
          <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-xl bg-brand-purple/10 text-brand-purple">
            <HiOutlineSparkles className="w-6 h-6" />
          </div>
          <h3 className="mb-3 text-xl font-extrabold text-gray-900">
            One thing at a time
          </h3>
          <p className="font-medium leading-relaxed text-gray-500">
            A calm, uncluttered screen for every lesson — nothing competing for
            your attention while you focus.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
