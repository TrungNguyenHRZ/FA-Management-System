import React, { useState } from "react";
import "./sidebar.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import {
  FaHouseChimney,
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

  const toggleSubMenuSyllabus = () => {
    setSubMenuSyllabus(!isSubMenuSyllabus);
  };

  const toggleSubMenuUser = () => {
    setSubMenuUser(!isSubMenuUser);
  };

  const toggleSubMenuClass = () => {
    setSubMenuClass(!isSubMenuClass);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Header />
      </div>
      <div className="home-container">
        <div className="sidebar-container">
          <ul>
            <li>
              <FaHouseChimney className="icon-sidebar" />
              <Link to={"/home"} className="home-link">
                Home
              </Link>
            </li>

            <li onClick={toggleSubMenuSyllabus}>
              <FaBookOpen className="icon-sidebar" />
              <span className="home-link">Syllabus</span>
            </li>
            <ul
              className={`sub-menu ${isSubMenuSyllabus ? "show-sub-menu" : ""}`}
            >
              <li>
                <Link to={"/view-syllabus"} className="home-link">
                  View Syllabus
                </Link>
              </li>
              <li>
                <Link to={"/create-syllabus"} className="home-link">
                  Create Syllabus
                </Link>
              </li>
            </ul>

            <li>
              <FaLightbulb className="icon-sidebar" />
              <Link to={"/training-program"} className="home-link">
                Training program
              </Link>
            </li>

            <li onClick={toggleSubMenuClass}>
              <FaGraduationCap className="icon-sidebar" />
              <span className="home-link">Class</span>
            </li>
            <ul className={`sub-menu ${isSubMenuClass ? "show-sub-menu" : ""}`}>
              <li>
                <Link to={"/view-class"} className="home-link">
                  View Class
                </Link>
              </li>
              <li>
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
              <li>
                <Link to={"/user-list"} className="home-link">
                  User list
                </Link>
              </li>
              <li>
                <Link to={"/create-user"} className="home-link">
                  Create User
                </Link>
              </li>
              <li>
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
