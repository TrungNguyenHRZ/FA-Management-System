import React from "react";
import DoughnutChart from "./Chart/DoughnutChart";
import "./overview.css";
import CountSyllabus from "./Specification/syllabus-count";
import CountClass from "./Specification/class-count";
import CountUser from "./Specification/user-count";
import CountTrainingProgram from "./Specification/traning-proram-count";
import LineChart from "./Chart/LineChart";
const Overview = () => {
  return (
    <div className="overview-container">
      <div className="specification-container">
        <CountSyllabus />
        <CountClass />
        <CountUser />
        <CountTrainingProgram />
      </div>
      <div className="chart-container">
        <div className="dc-chart">
          <LineChart />
          <DoughnutChart />
        </div>
      </div>
    </div>
  );
};

export default Overview;