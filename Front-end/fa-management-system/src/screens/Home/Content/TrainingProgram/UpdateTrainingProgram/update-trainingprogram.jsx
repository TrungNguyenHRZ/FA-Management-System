import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
import apiSyllabusInstance from "../../../../../service/api-syllabus";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import "./update-trainingprogram.css";
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
  const [listAddNewSyllabus, setListAddNewSyllabus] = useState([]);
  const [listDeleteSyllabus, setListDeleteSyllabus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseTrainingProgram, responseSyllabus] = await Promise.all([
          apiTrainingProgramInstance.get(`/detail/${trainingProgramId}`),

          apiSyllabusInstance.get("/view"),
        ]);

        setThisTrainingProgram(responseTrainingProgram.data.payload);
        setAddNewSyllabus(responseTrainingProgram.data.payload.syllabuses);
        setAllSyllabus(responseSyllabus.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allSyllabus && addNewSyllabus) {
      const filteredSyllabus = allSyllabus.filter((syllabus) => {
        return !addNewSyllabus.some(
          (newSyllabus) => newSyllabus.topic_code === syllabus.topic_code
        );
      });

      setFilterAllSyllabus(filteredSyllabus);
    }
  }, [allSyllabus, addNewSyllabus]);

  const handleCloseForm = (e) => {
    closeForm();
  };

  const addToList = (e, item1) => {
    setListAddNewSyllabus([...listAddNewSyllabus, item1]);

    const new_arr = filterAllSyllabus.filter((item) => item !== item1);
    setFilterAllSyllabus(new_arr);
  };

  const addToList2 = (e, item3) => {
    setFilterAllSyllabus([...filterAllSyllabus, item3]);
    const new_arr = listAddNewSyllabus.filter((item) => item !== item3);
    setListAddNewSyllabus(new_arr);
  };

  const addToDeleteList = (e, item2) => {
    setListDeleteSyllabus([...listDeleteSyllabus, item2]);
    const new_arr = addNewSyllabus.filter((item) => item !== item2);
    setAddNewSyllabus(new_arr);
  };

  const addToRemainList = (e, item4) => {
    setAddNewSyllabus([...addNewSyllabus, item4]);
    const new_arr = listDeleteSyllabus.filter((item) => item !== item4);
    setListDeleteSyllabus(new_arr);
  };

  let tmp_trainingprogram = {
    training_name: thisTrainingProgram.training_name,
    status: thisTrainingProgram.status,
    modified_date: "2023-12-01",
    generalInfo: thisTrainingProgram.generalInfo,
  };
  const ChangeName = (e) => {
    tmp_trainingprogram.training_name = e.target.value;
  };

  const ChangeInfo = (e) => {
    tmp_trainingprogram.generalInfo = e.target.value;
  };
  const ChangeStatus = (e) => {
    tmp_trainingprogram.status = e.target.value;
  };

  const SaveTrainingProgram = (e) => {
    apiTrainingProgramInstance
      .put(`/update-training-program/${trainingProgramId}`, tmp_trainingprogram)
      .then((response) => {
        console.log(response.data.payload);
      });
    if (listDeleteSyllabus.length > 0) {
      listDeleteSyllabus.map((item, index) => {
        apiTrainingProgramInstance.delete(
          `delete-training-program-syllabus?training_code=${thisTrainingProgram.training_code}&topic_code=${item.topic_code}`
        );
      });
    }

    if (listAddNewSyllabus.length > 0) {
      let tmp = [];
      for (const item of listAddNewSyllabus) {
        tmp.push({
          syllabus: item.topic_code,
          trainingProgram: thisTrainingProgram.training_code,
          sequence: "",
        });
      }

      apiTrainingProgramInstance.post("/create-training-program-syllabus", tmp);
    }

    updateForm();
  };

  const saveAll = (e, item2) => {};

  let renderData2 = () => {
    return (
      // if (allSyllabus && allSyllabus.length > 0) {
      // allSyllabus.map(
      <div className="choose-syllabus-container-update">
        <div className="form-choose-syllabus-training-update">
          <div className="training-program-content-main-update">
            {" "}
            {listDeleteSyllabus?.map((item4, index) => (
              <>
                <div
                  className="training-program-content"
                  onClick={(e) => addToRemainList(e, item4)}
                >
                  <div className="training-program-content-title">
                    <div>
                      <h2>{item4.topic_name}</h2>
                    </div>
                    <div>{item4.publish_status}</div>
                  </div>
                  <div className="training-program-detail">
                    <div>
                      Modified on {item4.modified_date} by {item4.modified_by}
                    </div>
                  </div>
                </div>
                <br />
              </>
            ))}
            {filterAllSyllabus?.map((item, index) => (
              <>
                <div
                  className="training-program-content-update"
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
            <div className="training-program-content-main-update">
              {addNewSyllabus?.map((item2, index) => (
                <>
                  <div className="training-program-content-update">
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
                        onClick={(e) => addToDeleteList(e, item2)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <br />
                </>
              ))}

              {listAddNewSyllabus?.map((item3, index) => (
                <>
                  <div className="training-program-content-update">
                    <div className="training-program-content-title">
                      <div>
                        <h2>{item3.topic_name}</h2>
                      </div>
                      <div>{item3.publish_status}</div>
                    </div>

                    <div className="training-program-detail">
                      <div>
                        Modified on {item3.modified_date} by {item3.modified_by}
                      </div>
                    </div>
                    <div className="btn-delete-choosed-container">
                      <button
                        className="btn-delete-choosed-syllabus"
                        onClick={(e) => addToList2(e, item3)}
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
        <div className="training-program-main-update">
          <div className="training-program-content-main-2-update">
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
                onChange={(e) => ChangeName(e)}
                type="text"
                defaultValue={thisTrainingProgram.training_name}
                required
              />

              <select
                name=""
                id=""
                defaultValue={thisTrainingProgram.status}
                onChange={(e) => ChangeStatus(e)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Drafting">Drafting</option>
              </select>
            </div>
          </div>
        </div>
        <div className="trainingprogram-detail-duration-form-container">
          <div className="trainingprogram-detail-duration-form">
            <div className="trainingprogram-detail-duration-update">
              <div>Duration:</div>
              <div>
                {thisTrainingProgram.duration} <span>days</span>
              </div>
            </div>

            <button onClick={SaveTrainingProgram}>Save</button>
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
            <input
              type="text"
              defaultValue={thisTrainingProgram.generalInfo}
              required
              onChange={(e) => ChangeInfo(e)}
            />
          </div>
        </div>

        <div className="btn-close-form"></div>
        <div className="choose-syllabus-training-title-update">
          Choose one or more syllabus on the left !!!
        </div>
        <div className="create-training-action"></div>
        <div style={{ height: "400px" }}>{renderData2()}</div>
      </div>
    </div>
  );
};

export default UpdateTrainingProgram;
