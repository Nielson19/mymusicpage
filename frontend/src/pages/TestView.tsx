import React from "react";
import MusicPlayerStatic from "../components/MusicPlayerStatic";
import MusicPlayerFeature from "../components/MusicPlayerFeature";
import ProfilePageView from "./ProfilePageView";
import LoginPageView from "./LoginPageView";
import CreatePost from "../components/CreatePost";
import CreatePlaylist from "../components/CreatePlaylist";
import GiphyPicker from "../components/GiphyPicker";
import Masonry from "../components/GeneralComp/Column";

function TestView() {
  return (
    <div>
      {/* <CreatePost /> */}
      <Masonry />
      {/* <GiphyPicker /> */}
    </div>
  );
}

export default TestView;
