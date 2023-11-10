import React, { useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa6";
import "./specification.css";
import CountUp from "react-countup";
import apiSyllabusInstance from "../../../../../service/api-syllabus";

const CountSyllabus = () => {
  const [countSyllabus, setCountSyllabus] = useState(0);

  useEffect(() => {
    apiSyllabusInstance
      .get("/view")
      .then((response) => {
        setCountSyllabus(response.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return (
    <div className="specificate-container">
      <div className="amount">
        <div className="count">
          <CountUp end={countSyllabus} />
        </div>
        <div className="title">Syllabus</div>
      </div>
      <div className="icon icon-syllabus">
        <FaBookOpen />
      </div>
    </div>
  );
};

export default CountSyllabus;
