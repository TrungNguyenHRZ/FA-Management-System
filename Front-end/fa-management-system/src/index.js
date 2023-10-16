import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./screens/Login/login";
import Sidebar from "./screens/Home/Dashboard/sidebar";
import Home from "./screens/Home/Content/Home/home";
import TrainingProgram from "./screens/Home/Content/TrainingProgram/training-program";
import CreateSyllabus from "./screens/Home/Content/Syllabus/CreateSyllbus/create-syllbus";
import UserList from "./screens/Home/Content/User/UserList/user-list";
import UserPermission from "./screens/Home/Content/User/UserPermission/user-permission";
import ViewClass from "./screens/Home/Content/Class/ViewClass/view-class";
import Syllabus from "./screens/Home/Content/Syllabus/ViewSyllabus/syllabus";
import CreateClass from "./screens/Home/Content/Class/CreateClass/create-class";
import CreateUser from "./screens/Home/Content/User/UserList/create-user";

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
        path: "/view-class",
        element: <ViewClass />,
      },
      {
        path: "/create-class",
        element: <CreateClass />,
      },
      {
        path: "/user-list",
        element: <UserList />,
      },
      {
        path: "/create-user",
        element: <CreateUser />,
      },
      {
        path: "/user-permission",
        element: <UserPermission />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
