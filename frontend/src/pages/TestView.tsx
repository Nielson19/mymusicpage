import React from "react";
import Post from "../components/Post";
import MusicPlayerStatic from "../components/MusicPlayerStatic";
import MusicPlayerFeature from "../components/MusicPlayerFeature";
import ProfilePageView from "./ProfilePageView";
import LoginPageView from "./LoginPageView";

function TestView() {
  return (
    <div>
      <LoginPageView />
      {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <MusicPlayerFeature/>
      </div>
       */}
    </div>
  );
}

export default TestView;
