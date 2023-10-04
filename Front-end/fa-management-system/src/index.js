import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./screens/Login/login";
import Sidebar from "./screens/Home/Dashboard/sidebar";
import Syllabus from "./screens/Home/Content/Syllabus/syllabus";
import Home from "./screens/Home/Content/Home/home";
import TrainingProgram from "./screens/Home/Content/TrainingProgram/training-program";
import CreateSyllabus from "./screens/Home/Content/Syllabus/CreateSyllbus/create-syllbus";
import UserList from "./screens/Home/Content/User/UserList/user-list";
import UserPermission from "./screens/Home/Content/User/UserPermission/user-permission";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Sidebar />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },

      {
        path: "/view-syllabus",
        element: <Syllabus />,
      },
      {
        path: "/create-syllabus",
        element: <CreateSyllabus />,
      },
      {
        path: "/training-program",
        element: <TrainingProgram />,
      },
      {
        path: "/user-list",
        element: <UserList />
      },
      {
        path: "/user-permission",
        element: <UserPermission />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
