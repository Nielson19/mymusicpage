import Input from "./components/Input";
import { IoMdEyeOff } from "react-icons/io";
import Post from "./components/Post";
import TestView from "./pages/TestView";
import LoginPageView from "./pages/LoginPageView";
import Post from "./components/Post";

function App() {
  return (
    <div className="">
      <LoginPageView />
      <Input size="MEDIUM" label="Email: " color={{ PRIMARY: "#1E1E1E" }} type="password" placeholder="Enter Email: " icon={<IoMdEyeOff />}/>
      <SearchBar />
    </div>
  );
}

export default App;
