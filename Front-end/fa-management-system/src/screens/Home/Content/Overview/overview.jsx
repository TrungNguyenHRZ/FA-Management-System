import React, { useEffect } from "react";
import DoughnutChart from "./Chart/DoughnutChart";
import "./overview.css";
import CountSyllabus from "./Specification/syllabus-count";
import CountClass from "./Specification/class-count";
import CountUser from "./Specification/user-count";
import CountTrainingProgram from "./Specification/traning-proram-count";
import LineChart from "./Chart/LineChart";
import Cookies from "js-cookie";
import Authorization from "../../../Authentication/Auth";
import { Link } from "react-router-dom";
const Overview = () => {
  useEffect(() => {
    Authorization();
  });
  return (
    <div className="overview-container">
      <div className="specification-container">
        <Link to={"/view-syllabus"}>
          <CountSyllabus />
        </Link>
        <Link to={"/view-class"}>
          <CountClass />
        </Link>
        <Link to={"/user-list"}>
          <CountUser />
        </Link>
        <Link to={"/view-trainingprogram"}>
          <CountTrainingProgram />
        </Link>
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
