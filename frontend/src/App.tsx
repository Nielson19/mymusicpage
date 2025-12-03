import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePageView from "./pages/ProfilePageView";
import PlaylistPage from "./pages/PlaylistPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfilePageView />} />
        <Route path="/playlist/:id" element={<PlaylistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

