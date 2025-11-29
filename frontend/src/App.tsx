import ProfilePageView from "./pages/ProfilePageView";
import TestView from "./pages/TestView";
import LoginPageView from "./pages/LoginPageView";
import SignupPageView from "./pages/SignupPageView";
import GiphyPicker from "./components/GiphyPicker";
import CreatePlaylist from "./components/CreatePlaylist";
import CreatePost from "./components/CreatePost";
import MasonryAdvanced from "./components/GeneralComp/MasonryAdvanced";
import { mockPlaylists } from "./components/GeneralComp/MockPlaylists";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3002";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      
      <LoginPageView />
      {/* <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
          <Route path='/register' element={<SignupPageView/>}/>
          <Route path='/login' element={<LoginPageView/>}/> 
      </Routes> */}

    </div>
  );
}

export default App;
