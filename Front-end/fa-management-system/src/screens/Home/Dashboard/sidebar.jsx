import React, { useState } from "react";
import "./sidebar.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import {
  FaChartPie,
  FaBookOpen,
  FaLightbulb,
  FaUserGroup,
  FaGraduationCap,
} from "react-icons/fa6";
import Header from "./Header/header";
import Footer from "./Footer/footer";

const Sidebar = () => {
  const [isSubMenuSyllabus, setSubMenuSyllabus] = useState(false);
  const [isSubMenuUser, setSubMenuUser] = useState(false);
  const [isSubMenuClass, setSubMenuClass] = useState(false);
  const [isSubMenuTrainingProgram, setSubMenuTrainingProgram] = useState(false);
  const [isPage, setPage] = useState(0);

  const changeOverview = () => {
    setPage(1);
  };
  const changeViewSyllabus = () => {
    setPage(2);
  };
  const changeCreateSyllabus = () => {
    setPage(3);
  };
  const changerTrainingProgram = () => {
    setPage(4);
  };
  const changeViewClass = () => {
    setPage(5);
  };
  const changeCreateClass = () => {
    setPage(6);
  };
  const changeUserList = () => {
    setPage(7);
  };
  const changeUserPermission = () => {
    setPage(8);
  };
  const changeViewTrainingProgram = () => {
    setPage(9);
  };
  const changeCreateTrainingProgram = () => {
    setPage(10);
  };
  const toggleSubMenuSyllabus = () => {
    setSubMenuSyllabus(!isSubMenuSyllabus);
  };

  const toggleSubMenuUser = () => {
    setSubMenuUser(!isSubMenuUser);
  };

  const toggleSubMenuClass = () => {
    setSubMenuClass(!isSubMenuClass);
  };

  const toggleSubMenuTrainingProgram = () => {
    setSubMenuTrainingProgram(!isSubMenuTrainingProgram);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Header />
      </div>
      <div className="home-sidebar-container">
        <div className="sidebar-container">
          <ul>
            <li
              className={isPage === 1 ? "sidebar-page" : ""}
              onClick={changeOverview}
            >
              <FaChartPie className="icon-sidebar" />
              <Link to={"/overview"} className="home-link">
                Overview
              </Link>
            </li>

            <li onClick={toggleSubMenuSyllabus}>
              <FaBookOpen className="icon-sidebar" />
              <span className="home-link">Syllabus</span>
            </li>
            <ul
              className={`sub-menu ${isSubMenuSyllabus ? "show-sub-menu" : ""}`}
            >
              <li
                className={isPage === 2 ? "sidebar-page" : ""}
                onClick={changeViewSyllabus}
              >
                <Link to={"/view-syllabus"} className="home-link">
                  View Syllabus
                </Link>
              </li>
              <li
                className={isPage === 3 ? "sidebar-page" : ""}
                onClick={changeCreateSyllabus}
              >
                <Link to={"/create-syllabus"} className="home-link">
                  Create Syllabus
                </Link>
              </li>
            </ul>

            <li onClick={toggleSubMenuTrainingProgram}>
              <FaLightbulb className="icon-sidebar" />
              <span className="home-link">Training program</span>
            </li>
            <ul
              className={`sub-menu ${
                isSubMenuTrainingProgram ? "show-sub-menu" : ""
              }`}
            >
              <li
                className={isPage === 9 ? "sidebar-page" : ""}
                onClick={changeViewTrainingProgram}
              >
                <Link to={"/view-trainingprogram"} className="home-link">
                  View Training Program
                </Link>
              </li>
              <li
                className={isPage === 10 ? "sidebar-page" : ""}
                onClick={changeCreateTrainingProgram}
              >
                <Link to={"/create-trainingprogram"} className="home-link">
                  Create Training Program
                </Link>
              </li>
            </ul>

            <li onClick={toggleSubMenuClass}>
              <FaGraduationCap className="icon-sidebar" />
              <span className="home-link">Class</span>
            </li>
            <ul className={`sub-menu ${isSubMenuClass ? "show-sub-menu" : ""}`}>
              <li
                className={isPage === 5 ? "sidebar-page" : ""}
                onClick={changeViewClass}
              >
                <Link to={"/view-class"} className="home-link">
                  View Class
                </Link>
              </li>
              <li
                className={isPage === 6 ? "sidebar-page" : ""}
                onClick={changeCreateClass}
              >
                <Link to={"/create-class"} className="home-link">
                  Create Class
                </Link>
              </li>
            </ul>

            <li onClick={toggleSubMenuUser}>
              <FaUserGroup className="icon-sidebar" />
              <span className="home-link">User management</span>
            </li>
            <ul className={`sub-menu ${isSubMenuUser ? "show-sub-menu" : ""}`}>
              <li
                className={isPage === 7 ? "sidebar-page" : ""}
                onClick={changeUserList}
              >
                <Link to={"/user-list"} className="home-link">
                  User list
                </Link>
              </li>
              <li
                className={isPage === 8 ? "sidebar-page" : ""}
                onClick={changeUserPermission}
              >
                <Link to={"/user-permission"} className="home-link">
                  User permission
                </Link>
              </li>
            </ul>
          </ul>
        </div>
        <div className="content-container">
          <Outlet />
        </div>
      </div>
      <div className="dashboard-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
