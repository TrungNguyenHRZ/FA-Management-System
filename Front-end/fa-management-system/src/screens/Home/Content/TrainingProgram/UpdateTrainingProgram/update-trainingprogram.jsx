import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
import apiSyllabusInstance from "../../../../../service/api-syllabus";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
const UpdateTrainingProgram = ({
  showForm,
  closeForm,
  trainingProgramId,
  updateForm,
}) => {
  const [thisTrainingProgram, setThisTrainingProgram] = useState({});
  const [allSyllabus, setAllSyllabus] = useState([]);
  const [addNewSyllabus, setAddNewSyllabus] = useState([]);
  const [filterAllSyllabus, setFilterAllSyllabus] = useState([]);

  useEffect(() => {
    apiTrainingProgramInstance
      .get(`/detail/${trainingProgramId}`)
      .then((response) => {
        setThisTrainingProgram(response.data.payload);
        console.log(response.data.payload);
        setAddNewSyllabus(response.data.payload.syllabuses);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    apiSyllabusInstance
      .get("/view")
      .then((response) => {
        console.log(response.data);
        setAllSyllabus(response.data);

        console.log(addNewSyllabus);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCloseForm = (e) => {
    closeForm();
  };

  let new_arr = [];
  if (addNewSyllabus && allSyllabus) {
    new_arr = allSyllabus.filter(
      (item) =>
        !addNewSyllabus.find((it2) => item.topic_code === it2.topic_code)
    );
  }
  // setFilterAllSyllabus(new_arr);

  const addToList = (e, item1) => {
    console.log(item1);
    setAddNewSyllabus([...addNewSyllabus, item1]);

    const new_arr = allSyllabus.filter((item) => item !== item1);
    setAllSyllabus(new_arr);
  };

  const addToList2 = (e, item2) => {
    console.log(item2);
    setAllSyllabus([...allSyllabus, item2]);
    const new_arr = addNewSyllabus.filter((item) => item !== item2);
    setAddNewSyllabus(new_arr);
  };

  const saveAll = (e, item2) => {};

  let renderData2 = () => {
    return (
      // if (allSyllabus && allSyllabus.length > 0) {
      // allSyllabus.map(

      <div className="choose-syllabus-container">
        <div className="form-choose-syllabus-training">
          <div className="training-program-content-main">
            {allSyllabus?.map((item, index) => (
              <>
                <div
                  className="training-program-content"
                  onClick={(e) => addToList(e, item)}
                >
                  <div className="training-program-content-title">
                    <div>
                      <h2>{item.topic_name}</h2>
                    </div>
                    <div>{item.publish_status}</div>
                  </div>
                  <div className="training-program-detail">
                    <div>
                      Modified on {item.modified_date} by {item.modified_by}
                    </div>
                  </div>
                </div>
                <br />
              </>
            ))}
          </div>
          <div className="training-program-main">
            <div className="training-program-content-main">
              {addNewSyllabus?.map((item2, index) => (
                <>
                  <div className="training-program-content">
                    <div className="training-program-content-title">
                      <div>
                        <h2>{item2.topic_name}</h2>
                      </div>
                      <div>{item2.publish_status}</div>
                    </div>

                    <div className="training-program-detail">
                      <div>
                        Modified on {item2.modified_date} by {item2.modified_by}
                      </div>
                    </div>
                    <div className="btn-delete-choosed-container">
                      <button
                        className="btn-delete-choosed-syllabus"
                        onClick={(e) => addToList2(e, item2)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <br />
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="training-program-main">
          <div className="training-program-content-main-2">
            <button onClick={(e) => saveAll(e)}>Save</button>
          </div>
        </div>
      </div>

      // );
      // }
    );
  };

  return (
    <div className="user-form-popup-container">
      <div className="trainingprogram-detail-main-form">
        <div className="trainingprogram-detail-btn-close-form">
          <button onClick={(e) => handleCloseForm(e)}>
            <MdClose />
          </button>
        </div>
        <br />
        <div className="trainingprogram-detail-form-container">
          <div className="trainingprogram-detail-form-head">
            <h1>Training Program</h1>
            <div className="trainingprogram-detail-form-head-2">
              <input
                type="text"
                defaultValue={thisTrainingProgram.training_name}
              />
              <div>({thisTrainingProgram.status})</div>
            </div>
          </div>
        </div>
        <div className="trainingprogram-detail-duration-form-container">
          <div className="trainingprogram-detail-duration-form">
            <div>Duration:</div>
            <div>
              {thisTrainingProgram.duration} <span>days</span>
            </div>
          </div>
          <div className="trainingprogram-detail-duration-form-2">
            <div>Modified on {thisTrainingProgram.modified_date} by :</div>
            <div>{thisTrainingProgram.modified_by}</div>
          </div>
        </div>

        <div className="trainingprogram-detail-general-form-container">
          <div className="trainingprogram-detail-general-form-head">
            <h4>General information</h4>
          </div>
          <div className="trainingprogram-detail-general-item">
            <input type="text" defaultValue={thisTrainingProgram.generalInfo} />
          </div>
        </div>

        <div className="btn-close-form"></div>
        <div className="choose-syllabus-training-title">
          Choose one or more syllabus on the left !!!
        </div>
        <div className="create-training-action"></div>
        <div style={{ height: "400px" }}>{renderData2()}</div>
      </div>
    </div>
  );
};

export default UpdateTrainingProgram;
