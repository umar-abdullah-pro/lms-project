const VideoPlayer = ({ url, title, onVideoEnd }) => {
  if (!url) return <div className="p-20 bg-gray-100 text-center rounded-2xl">Select a lesson to start playing</div>;

  return (
    <div className="bg-black rounded-3xl overflow-hidden shadow-2xl">
      <video 
        key={url} 
        controls 
        className="w-full aspect-video" 
        autoPlay
        // THIS IS THE CRITICAL LINE:
        onEnded={() => {
          console.log("🎬 BROWSER SAYS: Video finished playing!");
          if (onVideoEnd) {
            onVideoEnd();
          } else {
            console.error("❌ ERROR: onVideoEnd prop is missing in VideoPlayer!");
          }
        }}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="p-6 bg-white">
        <h2 className="text-xl font-extrabold text-gray-900">{title}</h2>
      </div>
    </div>
  );
};

export default VideoPlayer;