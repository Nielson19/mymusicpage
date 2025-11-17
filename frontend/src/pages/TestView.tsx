import React from "react";
import Post from "../components/Post";
import MusicPlayerStatic from "../components/MusicPlayerStatic";
import MusicPlayerFeature from "../components/MusicPlayerFeature";

function TestView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <MusicPlayerFeature />
    </div>
  );
}

export default TestView;
