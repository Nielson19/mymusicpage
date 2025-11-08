import React from "react";
import Post from "../components/Post";

function TestView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Post size="PORTRAIT" />
      <Post size="SQUARE" />
    </div>
  );
}

export default TestView;
