import Input from "./components/Input";
import { IoMdEyeOff } from "react-icons/io";
import Post from "./components/Post";
import TestView from "./pages/TestView";
import LoginPageView from "./pages/LoginPageView";
import GiphyPicker from "./components/GiphyPicker";

function App() {
  return (
    <div className="flex flex-row justify-center items-center h-screen w-screen">
      <GiphyPicker />
    </div>
  );
}

export default App;
