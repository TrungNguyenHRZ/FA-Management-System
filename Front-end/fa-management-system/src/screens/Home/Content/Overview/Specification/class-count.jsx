import React, { useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import "./specification.css";
import CountUp from "react-countup";
import apiClassInstance from "../../../../../service/api-class";
const CountClass = () => {
  const [countClass, setCountClass] = useState(0);
  useEffect(() => {
    apiClassInstance
      .get("/all")
      .then((response) => {
        setCountClass(response.data.payload.length);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return (
    <div className="specificate-container">
      <div className="amount">
        <div className="count">
          <CountUp end={countClass} />
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
