import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

//Context
import { AuthProvider } from "./Context/AuthContext";

//Loaders
import dashboardLoader from "./Loaders/dashboardLoader";
import CatalogLoader from "./Loaders/CatalogLoader";
import courseDetailsLoader from "./Loaders/courseDetailsLoader";

//Actions
import loginAction from "../Actions/loginAction";
import registerAction from "../Actions/registerAction";
import updateProfileAction from "../Actions/updateProfileAction";
import createCourseAction from "../Actions/createCourseAction";

//Pages
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import CourseDetail from "./Pages/CourseDetails";
import CreateCourse from "./Pages/CreateCourse";
import NotFound from "./Pages/NotFound";
import CourseCatalog from "./Pages/CourseCatalog";
import UpdateProfile from "./Pages/UpdateProfile";
import ManageCourse from "./Pages/ManageCourse";

//Components and Routes
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import GuestRoute from "./Components/GuestRoute";

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
          <ProtectedRoute>
            <ManageCourse />
          </ProtectedRoute>
        ),
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
