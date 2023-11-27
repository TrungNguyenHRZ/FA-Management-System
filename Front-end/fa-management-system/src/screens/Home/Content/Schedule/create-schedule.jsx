import React, { useState } from "react";
import "./create-schedule.css";
import { FaCheck } from "react-icons/fa6";
import apiScheduleInstance from "../../../../service/api-schedule";

const CreateMultipleSchedules = ({
  showForm,
  closeForm,
  classId,
  updateForm,
}) => {
  const [numberOfSchedules, setNumberOfSchedules] = useState(0);
  const [overlayStates, setOverlayStates] = useState(Array(10).fill(false));
  const maxSchedules = 10;

  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setNumberOfSchedules(selectedValue);
  };

  const handleSaveForm = (event, formIndex) => {
    const newOverlayStates = [...overlayStates];
    event.preventDefault();
    newOverlayStates[formIndex] = true;
    setOverlayStates(newOverlayStates);
  };

  const handleResetForms = () => {
    setOverlayStates(Array(10).fill(false));
    setNumberOfSchedules(0);
  };

  const handleCloseForms = () => {
    closeForm();
  };
  const SaveSchedules = (e, item) => {
    console.log(item);
    apiScheduleInstance
      .post(
        `/TestautoGenarateSchedule?classid=${classId}&slotPerWeek=${numberOfSchedules}`,
        item
      )
      .then((response) => console.log(response.data));
  };

  const renderScheduleForms = () => {
    const scheduleForms = [];
    for (let i = 0; i < numberOfSchedules; i++) {
      let tmp = {
        startTime: "",
        endTime: "",
        day: "",
        class_id: classId,
      };
      scheduleForms.push(
        <div key={i} className="schedule-form-input">
          <form onSubmit={(event) => handleSaveForm(event, i)}>
            <div className="schedule-form-time-input">
              <div className="schedule-form-start">
                <label htmlFor={`scheduleName${i}`}>Start time:</label>
                <input
                  type="time"
                  id={`scheduleName${i}`}
                  name={`scheduleName${i}`}
                  onChange={(e) => {
                    tmp.startTime = e.target.value;
                  }}
                  required
                />
              </div>
              <div className="schedule-form-end">
                {" "}
                <label htmlFor={`scheduleName${i}`}>End time:</label>
                <input
                  type="time"
                  id={`scheduleName${i}`}
                  name={`scheduleName${i}`}
                  onChange={(e) => {
                    tmp.endTime = e.target.value;
                  }}
                  required
                />
              </div>
            </div>
            <div className="schedule-form-day-class">
              <div className="schedule-form-day">
                <label htmlFor={`scheduleName${i}`}>Day</label>
                <input
                  type="date"
                  id={`scheduleName${i}`}
                  name={`scheduleName${i}`}
                  onChange={(e) => {
                    tmp.day = e.target.value;
                    console.log(tmp);
                  }}
                  required
                />
              </div>
            </div>

            <button
              className="schedule-form-btn-save"
              type="submit"
              onClick={(e) => SaveSchedules(e, tmp)}
            >
              Save
            </button>
          </form>
          {overlayStates[i] && (
            <div className="success-overlay">
              <div>
                <FaCheck />
              </div>
            </div>
          )}
        </div>
      );
    }
    return scheduleForms;
  };

  return (
    <div className="create-schedule-container">
      <div className="create-schedule-title">
        <h1>Create Multiple Schedules</h1>
      </div>
      <div className="create-schedule-action">
        <div className="create-schedule-input">
          <strong>Number of schedules</strong>
          <select value={numberOfSchedules} onChange={handleSelectChange}>
            {[...Array(maxSchedules).keys()].map((value) => (
              <option key={value} value={value + 1}>
                {value + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="create-schedule-reset">
          <button onClick={handleCloseForms}>Finish</button>
        </div>
      </div>

      <div className="schedule-forms-container">
        {numberOfSchedules === 0 ? (
          <h3 style={{ color: "red" }}>
            Please choose the number of schedules want to create !!!{" "}
          </h3>
        ) : (
          <div className="schedule-forms-input">{renderScheduleForms()}</div>
        )}
      </div>
    </div>
  );
};

export default CreateMultipleSchedules;
