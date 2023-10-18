import React from "react";
import { FaGraduationCap } from "react-icons/fa6";
import "./specification.css";
import CountUp from "react-countup";
const CountClass = () => {
  return (
    <div className="specificate-container">
      <div className="amount">
        <div className="count">
          <CountUp end={1678} />
        </div>
        <div className="title">Class</div>
      </div>
      <div className="icon icon-syllabus">
        <FaGraduationCap />
      </div>
    </div>
  );
};

export default CountClass;
