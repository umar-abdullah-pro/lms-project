import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import CourseDetail from "./Pages/CourseDetails";
import CreateCourse from "./Pages/CreateCourse";
import NotFound from "./Pages/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
import CourseCatalog from "./Pages/CourseCatalog";
import UserProfile from "./Pages/UserProfile";
import GuestRoute from "./GuestRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar is outside Routes so it appears on every page */}
        <Navbar />

        <div className="min-h-screen pb-10 bg-brand-beige">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route
              path="/all-courses"
              element={
                <ProtectedRoute>
                  <CourseCatalog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-course"
              element={
                <ProtectedRoute requiredRole="instructor">
                  <CreateCourse />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
