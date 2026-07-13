import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

//Context
import { AuthProvider } from "./features/auth/AuthContext";

//Loaders
import dashboardLoader from "./features/dashboard/dashboardLoader";
import CatalogLoader from "./features/courses/CatalogLoader";
import courseDetailsLoader from "./features/courses/courseDetailsLoader";
import { manageCourseLoader } from "./features/courses/manageCourseLoader";

//Actions
import loginAction from "./features/auth/loginAction";
import registerAction from "./features/auth/registerAction";
import updateProfileAction from "./features/dashboard/updateProfileAction";
import createCourseAction from "./features/courses/createCourseAction";
import manageCourseAction from "./actions/manageCourseAction";
import { dashboardAction } from "./features/dashboard/dashboardAction";
import { forgotPasswordAction } from "./features/auth/forgotPasswordAction";
import { resetPasswordAction } from "./features/auth/resetPasswordAction";

//pages
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import Home from "./features/home/Home";
import Dashboard from "./features/dashboard/Dashboard";
import CourseDetail from "./features/courses/CourseDetails";
import CreateCourse from "./features/courses/CreateCourse";
import NotFound from "./pages/NotFound";
import CourseCatalog from "./features/courses/CourseCatalog";
import UpdateProfile from "./features/dashboard/UpdateProfile";
import ManageCourse from "./features/courses/ManageCourse";

//Components and Routes
import Navbar from "./components/Navbar";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import GuestRoute from "./features/auth/GuestRoute";
import ForgotPassword from "./features/auth/forgotPassword";
import ResetPassword from "./features/auth/ResetPassword";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pb-10 bg-brand-beige">
        <Outlet />
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
        action: loginAction,
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
        action: registerAction,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        loader: dashboardLoader,
        action: dashboardAction,
      },
      {
        path: "all-courses",
        element: (
          <ProtectedRoute>
            <CourseCatalog />
          </ProtectedRoute>
        ),
        loader: CatalogLoader,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        ),
        action: updateProfileAction,
      },
      {
        path: "create-course",
        element: (
          <ProtectedRoute requiredRole="instructor">
            <CreateCourse />
          </ProtectedRoute>
        ),
        action: createCourseAction,
      },
      {
        path: "course/:id",
        element: <CourseDetail />,
        loader: courseDetailsLoader,
      },
      {
        path: "course/:id/manage",
        element: (
          <ProtectedRoute requiredRole="instructor">
            <ManageCourse />
          </ProtectedRoute>
        ),
        loader: manageCourseLoader,
        action: manageCourseAction,
      },
      {
        path: "/forgot-password",
        element: (
          <GuestRoute>
            <ForgotPassword />
          </GuestRoute>
        ),
        action: forgotPasswordAction,
      },
      {
        path: "/reset-password/:token",
        element: (
          <GuestRoute>
            <ResetPassword />
          </GuestRoute>
        ),
        action: resetPasswordAction,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
