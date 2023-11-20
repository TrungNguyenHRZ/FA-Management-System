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
  useEffect(() => {});
  const handleCloseForm = (e) => {
    e.preventDefault();
    closeForm();
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
              <h1>Name of Training Program</h1>
              <div>Status</div>
            </div>
          </div>
        </div>
        <div className="trainingprogram-detail-duration-form-container">
          <div className="trainingprogram-detail-duration-form">
            <h4>Duration: 31 </h4>
            <div>days </div>
          </div>
          <div className="trainingprogram-detail-duration-form">
            <h6>Modified on 20/10/2023 by </h6>
            <h5> Phat</h5>
          </div>
        </div>

        <div className="trainingprogram-detail-general-form-container">
          <div className="trainingprogram-detail-general-form-head">
            <h4>General information</h4>
          </div>
          <div className="trainingprogram-detail-general-item">
            <div>--------------------------</div>
            <div>--------------------------</div>
            <div>--------------------------</div>
          </div>
        </div>

        <div className="trainingprogram-detail-content-container">
          <div className="trainingprogram-detail-content-title">
            <h4>Content</h4>
          </div>
          <div className="trainingprogram-detail-item">
            <div className="trainingprogram-detail-item-detail">
              <div>1</div>
              <div>2</div>
            </div>
            <div className="trainingprogram-detail-item-detail">
              <div>1</div>
              <div>2</div>
            </div>
            <div className="trainingprogram-detail-item-detail">
              <div>1</div>
              <div>2</div>
            </div>
            <div className="trainingprogram-detail-item-detail">
              <div>1</div>
              <div>2</div>
            </div>
            <div className="trainingprogram-detail-item-detail">
              <div>1</div>
              <div>2</div>
            </div>
            <div className="trainingprogram-detail-item-detail">
              <div>1</div>
              <div>2</div>
            </div>
          </div>
        </div>
        <div>List of class</div>
      </div>
    </div>
  );
};

export default TrainingProgramDetail;
