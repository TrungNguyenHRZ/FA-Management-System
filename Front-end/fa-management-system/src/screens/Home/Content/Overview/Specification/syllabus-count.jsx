import React from "react";
import { FaBookOpen } from "react-icons/fa6";
import "./specification.css";
import CountUp from "react-countup";

const CountSyllabus = () => {
  return (
    <div className="specificate-container">
      <div className="amount">
        <div className="count">
          <CountUp end={1000} />
        </div>
        <div className="title">Syllbus</div>
      </div>
      <div className="icon icon-syllabus">
        <FaBookOpen />
      </div>
    </div>
  );
};

export default CountSyllabus;
