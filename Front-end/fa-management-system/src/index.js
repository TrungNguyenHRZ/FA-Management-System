import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Login from "./screens/Login/login";
import Sidebar from "./screens/Home/Dashboard/sidebar";
import TrainingProgram from "./screens/Home/Content/TrainingProgram/training-program";
import CreateSyllabus from "./screens/Home/Content/Syllabus/CreateSyllabus/create-syllabus";
import UserList from "./screens/Home/Content/User/UserList/user-list";
import UserPermission from "./screens/Home/Content/User/UserPermission/user-permission";
import ViewClass from "./screens/Home/Content/Class/ViewClass/view-class";
import Syllabus from "./screens/Home/Content/Syllabus/ViewSyllabus/syllabus";
import CreateClass from "./screens/Home/Content/Class/CreateClass/create-class";
import SyllabusDetail from "./screens/Home/Content/Syllabus/ViewSyllabus/syllabusDetail";
import Overview from "./screens/Home/Content/Overview/overview";
import ErrorPage from "./screens/Error/error-page";
import ViewTrainingProgram from "./screens/Home/Content/TrainingProgram/ViewTrainingProgram/view-trainingprogram";
import CreateTrainingProgram from "./screens/Home/Content/TrainingProgram/CreateTrainingProgram/create-trainingprogram";

import UpdateSyllabus from "./screens/Home/Content/Syllabus/ViewSyllabus/updateSyllabus";
import Cookies from "js-cookie";
// import CreateMultipleSchedules from "./screens/Home/Content/Class/CreateClass/t";

import CreateMultipleSchedules from "./screens/Home/Content/Schedule/create-schedule";
import Info from "./screens/Home/Information/info";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Sidebar />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/view-info",
          element: <Info />,
        },
        {
          path: "/overview",
          element: <Overview />,
        },
        {
          path: "/view-syllabus",
          element: <Syllabus />,
        },
        {
          path: "/view-syllabus/:id",
          element: <SyllabusDetail />,
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
          path: "/view-trainingprogram",
          element: <ViewTrainingProgram />,
        },
        {
          path: "/create-trainingprogram",
          element: <CreateTrainingProgram />,
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
          path: "/create-schedules",
          element: <CreateMultipleSchedules />,
        },
        {
          path: "/user-list",
          element: <UserList />,
        },
        {
          path: "/user-permission",
          element: <UserPermission />,
        },
        {
          path: "/update-syllabus/:id",
          element: <UpdateSyllabus />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
