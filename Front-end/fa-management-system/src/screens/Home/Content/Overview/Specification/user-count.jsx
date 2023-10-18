import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import "./specification.css";
import CountUp from "react-countup";
const CountUser = () => {
  return (
    <div className="specificate-container">
      <div className="amount">
        <div className="count">
          <CountUp end={56} />
        </div>
        <div className="title">User</div>
      </div>
      <div className="icon icon-syllabus">
        <FaUserGroup />
      </div>
    </div>
  );
};

export default CountUser;
