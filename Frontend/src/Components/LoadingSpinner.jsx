const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-brand-purple/20 border-t-brand-purple animate-spin" />
      <p className="text-gray-400 font-semibold text-sm tracking-wide">
        Loading courses...
      </p>
    </div>
  );
};

export default LoadingSpinner;
