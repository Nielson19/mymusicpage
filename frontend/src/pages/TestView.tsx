import ProfilePageView from "./ProfilePageView";
import LoginPageView from "./LoginPageView";
import CreatePost from "../components/CreatePost";
import CreatePlaylist from "../components/CreatePlaylist";
import GiphyPicker from "../components/GiphyPicker";
import Masonry from "../components/GeneralComp/MasonryStatic";
import MainDashboard from "./MainDashboard";
import { Music } from "lucide-react";
import MusicPlayerStatic from "../components/MusicPlayerStatic";
import PlaylistPage from "./PlaylistPage";

function TestView() {
  return (
    <div>
      {/* <ProfilePageView /> */}
      {/* <CreatePost /> */}
      {/* <GiphyPicker /> */}
      <PlaylistPage />
    </div>
  );
}

export default TestView;
