import React, { useEffect, useState } from "react";
import apiSyllabusInstance from "../../../../../service/api-syllabus";
import { SyncLoader } from "react-spinners";
import "./create-syllabus.css";

const CreateSyllabus = () => {
  const [page, setPage] = useState(1);
  

  let changeGeneral = () => {
    setPage(1);
    console.log(page);
  };

  let changeOutline = () => {
    setPage(2);
    console.log(page);
  };

  let changeOthers = () => {
    setPage(3);
    console.log(page);
  };
  return (
    <div className="create-syllabus-container">
      <div className="step-bar">
        <div
          className={page === 1 ? "step-bar-item-choose" : "step-bar-item"}
          onClick={changeGeneral}
        >
          General
        </div>
        <div
          className={page === 2 ? "step-bar-item-choose" : "step-bar-item"}
          onClick={changeOutline}
        >
          Outline
        </div>
        <div
          className={page === 3 ? "step-bar-item-choose" : "step-bar-item"}
          onClick={changeOthers}
        >
          Others
        </div>
      </div>
    </div>
  );
};

export default CreateSyllabus;
