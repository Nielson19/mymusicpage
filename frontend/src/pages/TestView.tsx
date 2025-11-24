import ProfilePageView from "./ProfilePageView";
import LoginPageView from "./LoginPageView";
import CreatePost from "../components/CreatePost";
import CreatePlaylist from "../components/CreatePlaylist";
import GiphyPicker from "../components/GiphyPicker";
import Masonry from "../components/GeneralComp/Masonry";
import MainDashboard from "./MainDashboard";
import { Music } from "lucide-react";
import MusicPlayerStatic from "../components/MusicPlayerStatic";

function TestView() {
  return (
    <div>
      <MainDashboard />
      {/* <ProfilePageView /> */}
      {/* <CreatePost /> */}
      {/* <GiphyPicker /> */}
    </div>
  );
}

export default TestView;
