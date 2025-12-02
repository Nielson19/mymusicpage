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
import SignupPageView from "./SignupPageView";
import SettingsPageView from "./SettingsPageView";

function TestView() {
  return (
    <div>
      {/* <LoginPageView /> */}
      {/* <SignupPageView /> */}
      {/* <ProfilePageView /> */}
      <MainDashboard />
      {/* <SettingsPageView /> */}
      {/* <PlaylistPage /> */}

      {/* <CreatePost /> */}
      {/* <CreatePlaylist /> */}
    </div>
  );
}

export default TestView;
