import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import "./detail-trainingprogram.css";
const TrainingProgramDetail = ({
  showForm,
  closeForm,
  trainingProgramId,
  updateForm,
}) => {
  const [thisTrainingProgram, setThisTrainingProgram] = useState({});

  useEffect(() => {
    apiTrainingProgramInstance
      .get(`/training-programs/${trainingProgramId}/detail`)
      .then((response) => {
        setThisTrainingProgram(response.data.payload);
        console.log(response.data.payload);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleCloseForm = (e) => {
    e.preventDefault();
    closeForm();
  };

  let renderData = () => {
    if (thisTrainingProgram.classes && thisTrainingProgram.classes.length > 0) {
      return thisTrainingProgram.classes.map((item, index) => (
        <tr key={item.topic_code}>
          <td>{item.className}</td>
          <td>{item.classCode}</td>
          <td>{item.createdDate}</td>
          <td>{item.create_by}</td>
          <td>{item.duration} days</td>
          <td>
            <div
              className={
                item.status === "Planning"
                  ? "td-status td-status-planning"
                  : item.status === "Opening"
                  ? "td-status td-status-opening"
                  : item.status === "Scheduled"
                  ? "td-status-scheduled"
                  : item.status === "Completed"
                  ? "td-status-completed"
                  : ""
              }
            >
              {item.status}
            </div>
          </td>
          <td>{item.location}</td>
          <td>{item.fsu}</td>
          <td>
            <div className="edit-user"></div>
          </td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td colSpan="8">No data available</td>
        </tr>
      );
    }
  };

  return (
    <div className="user-form-popup-container">
      <div className="trainingprogram-detail-main-form">
        <div className="trainingprogram-detail-btn-close-form">
          <button onClick={handleCloseForm}>
            <MdClose />
          </button>
        </div>
        <br />
        <div className="trainingprogram-detail-form-container">
          <div className="trainingprogram-detail-form-head">
            <h1>Training Program</h1>
            <div className="trainingprogram-detail-form-head-2">
              <h1>{thisTrainingProgram.training_name}</h1>
              <div>({thisTrainingProgram.status})</div>
            </div>
          </div>
        </div>
        <div className="trainingprogram-detail-duration-form-container">
          <div className="trainingprogram-detail-duration-form">
            <h4>Duration: {thisTrainingProgram.duration} </h4>
            <div>days </div>
          </div>
          <div className="trainingprogram-detail-duration-form">
            <h6>Modified on 20/10/2023 by </h6>
            <h5> {thisTrainingProgram.modified_by}</h5>
          </div>
        </div>

        <div className="trainingprogram-detail-general-form-container">
          <div className="trainingprogram-detail-general-form-head">
            <h4>General information</h4>
          </div>
          <div className="trainingprogram-detail-general-item">
            <div>{thisTrainingProgram.generalInfo}</div>
          </div>
        </div>

        <div className="trainingprogram-detail-content-container">
          <div className="trainingprogram-detail-content-title">
            <h4>Content</h4>
          </div>
          <div className="trainingprogram-detail-item">
            {thisTrainingProgram.syllabuses?.map((item, index) => (
              <div className="trainingprogram-detail-item-detail">
                <div className="trainingprogram-detail-item-detail-title">
                  <div>{item.topic_name}</div>
                  <div>{item.publish_status}</div>
                </div>

                <div>
                  {item.version} | Modifiled on {item.modified_date} by{" "}
                  {item.modified_by}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>List of class</div>
        <div className="table-scroll">
          {" "}
          <table className="table-syllabus table-detail-trainingprogram">
            <thead>
              <tr>
                <th>Class</th>
                <th>Class code</th>
                <th>Created on</th>
                <th>Created by</th>
                <th>Duration</th>
                <th className="th-view-class">Status</th>
                <th>Location</th>
                <th>FSU</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderData()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrainingProgramDetail;
