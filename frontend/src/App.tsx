import Input from "./components/Input";
import { IoMdEyeOff } from "react-icons/io";
import Post from "./components/Post";
import TestView from "./pages/TestView";
import LoginPageView from "./pages/LoginPageView";
import testLink from "/Users/asadchaudhry/Desktop/mymusicpage/frontend/src/assets/images/postpic.png"
import testLink2 from '/Users/asadchaudhry/Desktop/mymusicpage/frontend/src/assets/images/stock.jpg'

function App() {
  return (
    <div className="flex flex-row justify-center items-center h-screen w-screen">
      <Post imgLink={testLink2} size="SQUARE" songName="Baby" aristName="Justin Bieber" />
    </div>
  );
}

export default App;
