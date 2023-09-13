import { createBrowserRouter } from "react-router-dom";

import paths from "../consts/paths";
import CreateCourse from "../pages/CreateCourse";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: paths.root,
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: paths.createCoruse,
    element: (
      <ProtectedRoute>
        <CreateCourse />
      </ProtectedRoute>
    ),
  },
  {
    path: paths.dashboard,
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: paths.register,
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
]);

export default router;
