import Input from "./components/Input";
import { IoMdEyeOff } from "react-icons/io";
import Post from "./components/Post";
import TestView from "./pages/TestView";
import LoginPageView from "./pages/LoginPageView";
import GiphyPicker from "./components/GiphyPicker";
import CreatePlaylist from "./components/CreatePlaylist";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <div className="flex bg-purple-500 items-center justify-center">
      <CreatePost />
      </div>
  );
}

export default App;
