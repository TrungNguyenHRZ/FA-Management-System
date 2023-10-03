import React, { useState } from "react";
import "./sidebar.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { FaHouseChimney, FaBookOpen, FaLightbulb } from "react-icons/fa6";

const Sidebar = () => {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuVisible(!isSubMenuVisible);
  };

  return (
    <div className="home-container">
      <div className="sidebar-container">
        <div className="title-sidebar">Fresher Academy Management System</div>
        <ul>
          <li>
            <FaHouseChimney className="icon-sidebar" />
            <Link to={"/home"} className="home-link">
              Home
            </Link>
          </li>
          <li onClick={toggleSubMenu}>
            <FaBookOpen className="icon-sidebar" />
            <span className="home-link">Syllabus</span>
          </li>
          <ul className={`sub-menu ${isSubMenuVisible ? "show-sub-menu" : ""}`}>
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
            <Link to={"/course"} className="home-link">
              Course
            </Link>
          </li>
        </ul>
      </div>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
