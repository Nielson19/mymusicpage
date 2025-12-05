import TestView from "./pages/TestView";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components/AuthComponents/ProtectedRoute";
import { Toaster } from "react-hot-toast";

// Pages
import LoginPageView from "./pages/LoginPageView";
import SignupPageView from "./pages/SignupPageView";
import MainDashboard from "./pages/MainDashboard";
import ProfilePageView from "./pages/ProfilePageView";
import PlaylistPage from "./pages/PlaylistPage";
import SettingsPageView from "./pages/SettingsPageView";
import axios from "axios";
import { UserContextProvider } from "../context/userContext";

// Prefer env-driven API URL; fall back to same-origin /api to avoid CORS via dev proxy.
const apiBase =
  import.meta?.env?.VITE_API_URL ||
  (typeof window !== "undefined"
    ? `${window.location.origin}/api`
    : "http://localhost:3002");

axios.defaults.baseURL = apiBase;
// Disable cookies/credentials to avoid credentialed CORS errors
axios.defaults.withCredentials = false;

function App() {
  return (
    <UserContextProvider>
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
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPageView />} />
          <Route path="/signup" element={<SignupPageView />} />

          {/* These are the pages that will require authentication to join in */}
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <MainDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <ProfilePageView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlist/:playlistId"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <PlaylistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <SettingsPageView />
              </ProtectedRoute>
            }
          />

          {/* Route for testing */}
          {/* Test View Route */}
          <Route path="/test" element={<TestView />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
