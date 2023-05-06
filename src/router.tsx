import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "src/App";
import { Paths } from "./constants/paths";
import { CourseItem, Courses, ErrorPage } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to={Paths.courses} replace />,
      },
      {
        path: Paths.error,
        element: <ErrorPage />,
      },
      {
        path: Paths.course,
        element: <CourseItem />,
      },
      {
        path: Paths.courses,
        element: <Courses />,
      },
      {
        path: "*",
        element: <Navigate to={Paths.courses} />,
      },
    ],
  },
]);
