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
import { BurgerMenu } from "../components/BurgerMenu";
import ProfilePicture from "../components/ProfilePicture";

function TestView() {
  return (
    <div>
      {/* <LoginPageView /> */}
      {/* <SignupPageView /> */}
      {/* <ProfilePageView /> */}
      {/* <MainDashboard /> */}
      {/* <SettingsPageView /> */}
      {/* <PlaylistPage /> */}
      {/* <GiphyPicker
        onSelectGif={(url) => console.log("Selected GIF URL:", url)} */}
      {/* <BurgerMenu
        iconImage="https://cdn-icons-png.flaticon.com/512/1828/1828859.png"
        items={[
          { label: "Profile", onClick: () => console.log("Profile clicked") },
          { label: "Settings", onClick: () => console.log("Settings clicked") },
          { label: "Logout", onClick: () => console.log("Logout clicked") },
        ]}
      /> */}
      <ProfilePicture />
      {/* <CreatePost /> */}
      {/* <CreatePlaylist /> */}
    </div>
  );
}

export default TestView;
