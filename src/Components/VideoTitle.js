import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute w-screen aspect-video px-12 pt-[20%] text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-5xl font-bond">{title}</h1>
      <p className="hidden md:inline-block w-3/6 text-lg py-6">{overview}</p>

      <div>
        <button className="p-2 bg-opacity-80 md:p-4 my-4 bg-white rounded-lg text-black hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="hidden md:inline-block mx-2 p-4 my-4 bg-gray-600 rounded-lg">
          ℹ️ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
