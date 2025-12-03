import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePageView from "./pages/ProfilePageView";
import PlaylistPage from "./pages/PlaylistPage";
import CreatePlaylist from "./components/CreatePlaylist";

function App() {
  return (
    <CreatePlaylist />
  );
}

export default App;

