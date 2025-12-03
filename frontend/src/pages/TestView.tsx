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
import SettingButtonList from "../components/SettingButtonList";

function TestView() {
  return (
    <div>
      {/* <MainDashboard /> */}
      {/* <CreatePost /> */}
      {/* <GiphyPicker /> */}
      {/* <PlaylistPage /> */}
      <SettingButtonList />
    </div>
  );
}

export default TestView;
