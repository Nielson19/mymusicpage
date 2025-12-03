import TestView from "./pages/TestView";
import { Routes, Route, Navigate } from "react-router-dom";
// import { ProtectedRoute } from "./components/AuthComponents/ProtectedRoute";
import { Toaster } from "react-hot-toast";

// TODO: add auth context
// import { AuthProvider } from "./contexts/AuthContext";

// Pages
import LoginPageView from "./pages/LoginPageView";
import SignupPageView from "./pages/SignupPageView";
import MainDashboard from "./pages/MainDashboard";
import ProfilePageView from "./pages/ProfilePageView";
import PlaylistPage from "./pages/PlaylistPage";
import SettingsPageView from "./pages/SettingsPageView";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3002";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={
          // Define default options
          {
            className: "",
            duration: 2000,
            removeDelay: 300,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }
        }
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPageView />} />
        <Route path="/signup" element={<SignupPageView />} />

        {/* These are the pages that will require authentication to join in */}
        {/* Protected Routes */}
        <Route
          path="/"
          element={
              <MainDashboard />
          }
        />
        <Route
          path="/profile/:username"
          element={

              <ProfilePageView />

          }
        />
        <Route
          path="/playlist/:playlistId"
          element={

              <PlaylistPage />
          }
        />
        <Route
          path="/settings"
          element={
              <SettingsPageView />
          }
        />

        {/* Route for testing */}
        {/* Test View Route */}
        <Route path="/test" element={<TestView />} />
      </Routes>
    </>
  );
}

export default App;