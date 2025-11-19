import ProfilePageView from "./pages/ProfilePageView";
import TestView from "./pages/TestView";
import LoginPageView from "./pages/LoginPageView";
import GiphyPicker from "./components/GiphyPicker";
import CreatePlaylist from "./components/CreatePlaylist";
import CreatePost from "./components/CreatePost";
import MasonryAdvanced from "./components/GeneralComp/MasonryAdvanced";
import { mockPlaylists } from "./components/GeneralComp/MockPlaylists";

function App() {
  return (
    <div>
      <ProfilePageView />
    </div>
  );
}

export default App;
