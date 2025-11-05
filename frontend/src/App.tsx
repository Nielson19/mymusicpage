import LoginPageView from "./pages/LoginPageView";
import Input from "./components/Input";
import SearchBar from "./components/SearchBar";
import { IoMdEyeOff } from "react-icons/io";

function App() {
  return (
    <div className="">
      <LoginPageView />
      <Input size="SMALL" label="Email: " color={{ PRIMARY: "#7C4DFF" }} type="password" placeholder="Enter Email: "/>
      <SearchBar />
    </div>
  );
}

export default App;
