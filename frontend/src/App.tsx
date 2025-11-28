import TestView from "./pages/TestView";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/AuthComponents/ProtectedRoute";

// TODO: add auth context
// import { AuthProvider } from "./contexts/AuthContext";

// Pages
import LoginPageView from "./pages/LoginPageView";
import SignupPageView from "./pages/SignupPageView";
import MainDashboard from "./pages/MainDashboard";
import ProfilePageView from "./pages/ProfilePageView";
import PlaylistPage from "./pages/PlaylistPage";
import SettingsPageView from "./pages/SettingsPageView";

function App() {
  return (
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
  );
}

export default App;
