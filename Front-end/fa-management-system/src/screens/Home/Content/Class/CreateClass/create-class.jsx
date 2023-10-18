import React, { useEffect, useState } from "react";
import apiClassInstance from "../../../../../service/api-class";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
const CreateClass = () => {
  const [listTrainingProgram, setListTrainingProgram] = useState([]);

  useEffect(() => {
    apiTrainingProgramInstance
      .get("/all")
      .then((response) => {
        setListTrainingProgram(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(listTrainingProgram);

  let className = null;
  const changeName = (e) => {
    className = e.target.value;
    console.log(className);
  };

  let classCode = null;
  const changeCode = (e) => {
    classCode = e.target.value;
  };

  let classDuration = null;
  const changeDuration = (e) => {
    classDuration = e.target.value;
  };

  let classLocation = null;
  const changeLocation = (e) => {
    classLocation = e.target.value;
  };

  let classFsu = null;
  const changeFsu = (e) => {
    classFsu = e.target.value;
  };

  let classStart_date = null;
  const changeStart_date = (e) => {
    classStart_date = e.target.value;
  };

  let classStatus = null;
  const changeStatus = (e) => {
    classStatus = e.target.value;
  };

  let classEnd_date = null;
  const changeEnd_date = (e) => {
    classEnd_date = e.target.value;
  };

  let classCreate_by = null;
  const changeCreate_by = (e) => {
    classCreate_by = e.target.value;
  };

  let classCreatedDate = null;
  const changeCreatedDate = (e) => {
    classCreatedDate = e.target.value;
  };

  let classModified_date = null;
  const changeModified_date = (e) => {
    classModified_date = e.target.value;
  };

  let classModified_by = null;
  const changeModified_by = (e) => {
    classModified_by = e.target.value;
  };

  let classTrainingProgram_id = null;
  const changeTrainingProgram_id = (e) => {
    classTrainingProgram_id = e.target.value;
  };

  const add = (e) => {
    apiClassInstance
      .post("/CreateClass", {
        className: className,
        classCode: classCode,
        duration: classDuration,
        status: classStatus,
        location: classLocation,
        fsu: classFsu,
        start_date: classStart_date,
        end_date: classEnd_date,
        create_by: classCreate_by,
        createdDate: classCreatedDate,
        modified_date: classModified_date,
        modified_by: classModified_by,
        trainingProgram_id: classTrainingProgram_id,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="view-syllbus-container">
      <h1>Add new class</h1>

      <div className="table-syllabus-container">
        <table className="table-syllabus">
          <tbody>
            <text>Class Name</text>
            <input type="text" onChange={changeName} />
            <br />
            <text>Class Code</text>
            <input type="text" onChange={changeCode} />
            <br />
            <text>Duration</text>
            <input type="text" onChange={changeDuration} />
            <br />
            <text>Status</text>
            <input type="text" onChange={changeStatus} />
            <br />
            <text>Location</text>
            <input type="text" onChange={changeLocation} />
            <br />
            <text>Fsu</text>
            <input type="text" onChange={changeFsu} />
            <br />
            <text>Start_date</text>
            <input type="date" onChange={changeStart_date} />
            <br />
            <text>End_date</text>
            <input type="date" onChange={changeEnd_date} />
            <br />
            <text>Create_by</text>
            <input type="text" onChange={changeCreate_by} />
            <br />
            <text>CreatedDate</text>
            <input type="date" onChange={changeCreatedDate} />
            <br />
            <text>Modified_date</text>
            <input type="date" onChange={changeModified_date} />
            <br />
            <text>Modified_by</text>
            <input type="text" onChange={changeModified_by} />
            <br />
            <text>Training Program_id</text>
            <select onChange={changeTrainingProgram_id}>
              {listTrainingProgram?.map((item, index) => {
                return (
                  <option value={item.training_code} key={item.training_code}>
                    {item.training_name}
                  </option>
                );
              })}
            </select>
            <br />
            <button className="btn-search" onClick={add}>
              Add new
            </button>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateClass;
