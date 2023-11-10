import React, { useEffect, useState } from "react";
import { FaLightbulb } from "react-icons/fa6";
import "./specification.css";
import CountUp from "react-countup";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
const CountTrainingProgram = () => {
  const [countTrainingProgram, setCountTrainingProgram] = useState(0);

  useEffect(() => {
    apiTrainingProgramInstance
      .get("/all")
      .then((response) => {
        setCountTrainingProgram(response.data.payload.length);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return (
    <div className="specificate-container">
      <div className="amount">
        <div className="count">
          <CountUp end={countTrainingProgram} />
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
