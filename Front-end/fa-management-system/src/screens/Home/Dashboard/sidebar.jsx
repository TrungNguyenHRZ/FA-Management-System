import React from "react";
import "./sidebar.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { FaHouseChimney, FaBookOpen, FaLightbulb } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <div className="home-container">
      <div className="sidebar-container">
        FA Management System
        <ul>
          <li>
            <FaHouseChimney className="icon-sidebar" />
            <Link to={"/home"} className="home-link">
              Home
            </Link>
          </li>
          <li>
            <FaBookOpen className="icon-sidebar" />
            <Link to={"/syllabus"} className="home-link">
              Syllabus
            </Link>
          </li>
          <li>
            <FaLightbulb className="icon-sidebar" />
            <Link to={"/course"} className="home-link">
              Course
            </Link>
          </li>
          {/* Thêm các mục menu khác nếu cần */}
        </ul>
      </div>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
