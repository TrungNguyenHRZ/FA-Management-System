import React from "react";
import { FaLightbulb } from "react-icons/fa6";
import "./specification.css";
import CountUp from "react-countup";
const CountTrainingProgram = () => {
  return (
    <div className="specificate-container">
      <div className="amount">
        <div className="count">
          <CountUp end={578} />
        </div>
        <div className="title">Program</div>
      </div>
      <div className="icon icon-syllabus">
        <FaLightbulb />
      </div>
    </div>
  );
};

export default CountTrainingProgram;
