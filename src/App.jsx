import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterForm from "./components/Auth/RegisterForm";
import LoginForm from "./components/Auth/LoginForm";
import StudentDashboard from "./pages/StudentDashboard";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import ProctorDashboard from "./pages/ProctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeViewer from "./pages/ResumeViewer";
import EditProfile from "./pages/EditProfile";
import ManageUsers from "./pages/ManageUsers";
import EditFacultyProfile from "./pages/EditFacultyProfile";
import UserProfile from "./pages/UserProfile";
import Chat from "./pages/Chat";
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Student Routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* // Add this new route in App.jsx */}
        <Route
          path="/user-profile/:userId"
          element={
            <ProtectedRoute
              allowedRoles={["student", "professor", "admin", "proctor"]}
            >
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Club Lead Routes */}
        {/* <Route
          path="/club-lead-dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']} requireClubLead={true}>
              <ClubLeadDashboard />
            </ProtectedRoute>
          }
        /> */}

        {/* Resume Routes */}
        <Route
          path="/resume"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume/:id"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <ResumeViewer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <ResumeBuilder isEditing={true} />
            </ProtectedRoute>
          }
        />

        {/* // Add this to your existing routes */}
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/* // Add this route to your existing routes */}
        <Route
          path="/edit-faculty-profile"
          element={
            <ProtectedRoute allowedRoles={["professor"]}>
              <EditFacultyProfile />
            </ProtectedRoute>
          }
        />

        {/* chat Route */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute
              allowedRoles={["student", "clubLead", "proctor", "professor"]}
            >
              <Chat />
            </ProtectedRoute>
          }
        />

        {/* Faculty Routes */}
        <Route
          path="/professor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["professor"]}>
              <ProfessorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/proctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["professor"]} requireProctor={true}>
              <ProctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-students"
          element={
            <ProtectedRoute allowedRoles={["professor"]} requireProctor={true}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
