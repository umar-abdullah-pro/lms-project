import { HiOutlineLockClosed } from "react-icons/hi2";
import { useRef } from "react";

const VideoPlayer = ({ url, title, isLocked, initialTime = 0, onVideoEnd, onProgressUpdate }) => {
  const videoRef = useRef(null);
  const lastSyncTimeRef = useRef(0);
  //Empty State
  if (!url) {
    return (
      <div className="flex items-center justify-center w-full bg-gray-900 aspect-video rounded-3xl shadow-2xl">
        <p className="font-bold text-gray-400">
          Select a lesson to start learning
        </p>
      </div>
    );
  }

  //Paywall State (If they click a locked lesson!)
  if (isLocked) {
    return (
      <div className="overflow-hidden bg-gray-900 rounded-3xl shadow-2xl">
        <div className="flex flex-col items-center justify-center w-full px-8 text-center bg-linear-to-br from-gray-900 to-black aspect-video">
          <div className="p-4 mb-4 bg-white/10 rounded-full">
            <HiOutlineLockClosed className="w-10 h-10 text-brand-yellow" />
          </div>
          <h2 className="mb-2 text-3xl font-extrabold text-white">
            Premium Lesson
          </h2>
          <p className="max-w-md text-gray-400">
            "{title}" is locked. Enroll in the course to unlock all video
            lessons, resources, and progress tracking.
          </p>
        </div>
        <div className="p-6 bg-white border-t border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-400 line-through decoration-2 decoration-gray-300">
            {title}
          </h2>
        </div>
      </div>
    );
  }

  //Playing State (Unlocked)
  return (
    <div className="overflow-hidden bg-black shadow-2xl rounded-3xl group">
      <video
        ref={videoRef}
        key={url}
        controls
        controlsList="nodownload"
        className="w-full aspect-video outline-none"
        autoPlay
        onLoadedMetadata={() => {
          if (videoRef.current && initialTime > 0) {
            videoRef.current.currentTime = initialTime;
          }
        }}
        onTimeUpdate={() => {
          if (!videoRef.current || !onProgressUpdate) return;
          
          const currentTime = videoRef.current.currentTime;
          const totalTime = videoRef.current.duration || 0;
          // Sync every 5 seconds
          if (Math.abs(currentTime - lastSyncTimeRef.current) >= 5) {
            onProgressUpdate(currentTime, totalTime);
            lastSyncTimeRef.current = currentTime;
          }
        }}
        onEnded={() => {
          if (onVideoEnd) onVideoEnd();
        }}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="p-6 bg-white border-t border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-gray-900">{title}</h2>
          <span className="px-3 py-1 text-xs font-bold text-brand-purple bg-brand-purple/10 rounded-full">
            Now Playing
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
