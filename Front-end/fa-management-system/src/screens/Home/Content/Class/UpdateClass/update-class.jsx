import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import apiClassInstance from "../../../../../service/api-class";
import apiUserInstance from "../../../../../service/api-user";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import "./update-class.css";
import { useNavigate } from "react-router";
import Authorization from "../../../../Authentication/Auth";

const UpdateClass = ({ showForm, closeForm, classId, updateForm }) => {
  const [thisClass, setThisClass] = useState({});
  const [listTrainingProgram, setListTrainingProgram] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [listAllUser, setListAllUser] = useState({});

  const [allUser, setAllUser] = useState([]);
  const [filterAllUser, setFilterAllUser] = useState([]);
  const [remainUser, setRemainUser] = useState({});
  const [totalUser, setTotalUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Authorization();
    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);

    if (decodedToken.userInfo[0] !== "Supper_Admin") {
      navigate("/overview");
    }
  }, []);

  useEffect(() => {
    apiUserInstance
      .get("/all")
      .then((response) => {
        setAllUser(response.data.userResponseList);
        console.log(response.data.userResponseList);
        setFilterAllUser(
          response.data.userResponseList.filter((item) =>
            item.userType.startsWith("Trainer")
          )
        );
        setRemainUser(
          response.data.userResponseList.filter((item) =>
            item.userType.startsWith("Trainer")
          )[0]
        );

        apiClassInstance
          .get(`/getUserByClassId?classId=${classId}`)
          .then((response2) => {
            console.log(response2.data.payload);
            setListAllUser(response2.data.payload);
            let tmp = [];
            response.data.userResponseList.map((item1, index1) => {
              response2.data.payload.map((item2, index2) => {
                if (item1.id == item2.userId) {
                  tmp.push(item1);
                }
              });
            });
            setTotalUser(tmp);
            console.log(totalUser);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    apiClassInstance
      .get("/" + classId)
      .then((response) => {
        setThisClass(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    apiTrainingProgramInstance
      .get("/all")
      .then((response) => {
        setListTrainingProgram(response.data.payload);
      })
      .catch((error) => {
        console.error(error);
      });

    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserInfo(decodedToken);
    }
  }, []);

  const changeTrainer = (e) => {
    if (e.target.value == "Trainer") {
      setFilterAllUser(
        allUser.filter((item) => item.userType.startsWith("Trainer"))
      );
      setRemainUser(
        allUser.filter((item) => item.userType.startsWith("Trainer"))[0]
      );
    } else {
      setFilterAllUser(
        allUser.filter((item) => item.userType.startsWith("Admin"))
      );
      setRemainUser(
        allUser.filter((item) => item.userType.startsWith("Admin"))[0]
      );
    }
  };

  const changeUser = (e) => {
    setRemainUser(allUser.filter((item) => item.id == e.target.value)[0]);
    console.log(allUser.filter((item) => item.id == e.target.value)[0]);
  };

  const addNewUser = (e) => {
    if (totalUser.filter((item) => item == remainUser)[0] == remainUser) {
    } else {
      let flag = true;
      for (const item of totalUser) {
        if (item.userType == remainUser.userType) {
          flag = false;
        }
      }
      if (flag) {
        setTotalUser([...totalUser, remainUser]);
      }
      console.log(remainUser);
    }
  };

  const deleteUser = (e) => {
    const tmp = allUser.filter((item) => item.id == e.target.value)[0];
    console.log(tmp);
    const tmp2 = totalUser.filter((item) => item !== tmp);
    setTotalUser(tmp2);
    console.log(tmp2);
  };

  const handleCloseForm = (e) => {
    e.preventDefault();
    closeForm();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("user-form-popup-container")) {
      closeForm();
    }
  };
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

  const update = async (e) => {
    await apiClassInstance
      .put(`/UpdateClass/${classId}`, {
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

    if (totalUser.length == 2 && listAllUser.length == 2) {
      let flag = 0;
      totalUser.map((item, index) => {
        apiClassInstance.put(
          `/UpdateClassUser/${listAllUser[flag].userId}/${classId}`,
          {
            userId: item.id,
            classId: classId,
            userType: "",
          }
        );
        flag = flag + 1;
      });
    }

    if (totalUser.length == 1 && listAllUser.length == 1) {
      totalUser.map((item, index) => {
        apiClassInstance.put(
          `/UpdateClassUser/${listAllUser[0].userId}/${classId}`,
          {
            userId: item.id,
            classId: classId,
            userType: "",
          }
        );
      });
    }

    if (totalUser.length == 2 && listAllUser.length == 1) {
      apiClassInstance.put(
        `/UpdateClassUser/${listAllUser[0].userId}/${classId}`,
        {
          userId: totalUser[0].id,
          classId: classId,
          userType: "",
        }
      );

      apiClassInstance
        .post("/CreateClassUser", {
          userId: totalUser[1].id,
          classId: classId,
          userType: "",
        })
        .then((response) => {
          console.log(response.data);
        });
    }

    if (totalUser.length > 0 && listAllUser.length == 0) {
      const tmp = [];
      for (const item of totalUser) {
        tmp.push({
          userId: item.id,
          classId: classId,
          userType: item.userType,
        });
      }
      console.log(tmp);
      apiClassInstance.post("/CreateMultiClassUser", tmp).then((response) => {
        console.log(response.data);
      });
      updateForm();
    }

    updateForm();
  };

  return (
    <div className="user-form-popup-container" onClick={handleOverlayClick}>
      <div className="user-form">
        <div className="btn-close-form">
          <button onClick={handleCloseForm}>
            <MdClose />
          </button>
        </div>
        {/* <form action="" className="user-form-container"> */}
        <div className="user-form-container">
          <div className="ip ip-name-email">
            <div className="user-name">
              <label htmlFor="full-name">Class name</label>
              <div className="input-form input-name">
                <input
                  type="text"
                  defaultValue={thisClass.className}
                  onChange={changeName}
                  required
                />
              </div>
            </div>
            <div className="user-email">
              <label htmlFor="email">Class code</label>
              <div className="input-form input-email">
                <input
                  type="text"
                  defaultValue={thisClass.classCode}
                  onChange={changeCode}
                  required
                />
              </div>
            </div>
          </div>
          <div className="ip ip-phone-doba">
            <div className="user-phone">
              <label htmlFor="phone">Duration</label>
              <div className="input-form input-phone">
                <input
                  type="number"
                  defaultValue={thisClass.duration}
                  onChange={changeDuration}
                  readOnly
                />
              </div>
            </div>
            <div className="user-phone">
              <label htmlFor="phone">Status</label>

              <div className="input-form input-phone">
                <select
                  defaultValue={thisClass.status}
                  className="user-type-select"
                  onChange={changeStatus}
                >
                  <option
                    value="Opening"
                    selected={thisClass.status == "Opening"}
                  >
                    Opening
                  </option>
                  <option
                    value="Planning"
                    selected={thisClass.status == "Planning"}
                  >
                    Planning
                  </option>
                  <option
                    value="Scheduled"
                    selected={thisClass.status == "Scheduled"}
                  >
                    Scheduled
                  </option>
                  <option
                    value="Completed"
                    selected={thisClass.status == "Completed"}
                  >
                    Completed
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="ip ip-phone-doba">
            <div className="user-phone">
              <label htmlFor="phone">Location</label>
              <div className="input-form input-phone">
                <input
                  type="text"
                  defaultValue={thisClass.location}
                  onChange={changeLocation}
                  required
                />
              </div>
            </div>

            <div className="user-phone">
              <label htmlFor="phone">FSU</label>
              <div className="input-form input-phone">
                <input
                  type="text"
                  defaultValue={thisClass.fsu}
                  onChange={changeFsu}
                  required
                />
              </div>
            </div>
          </div>
          <div className="ip ip-phone-doba">
            <div className="user-phone">
              <label htmlFor="phone">Created by</label>
              <div className="input-form input-phone">
                <input
                  type="text"
                  defaultValue={thisClass.create_by}
                  onChange={changeCreate_by}
                  readOnly
                />
              </div>
            </div>

            <div className="user-phone">
              <label htmlFor="phone">Modified by</label>
              <div className="input-form input-phone">
                <input
                  type="text"
                  defaultValue={userInfo && userInfo.name}
                  onChange={changeModified_by}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="pickTrainer-form-container">
            <div className="pickTrainer-form-Pick-container">
              <div>
                <div>
                  <h1>Pick Trainer / Admin</h1>
                </div>
                <div className="pickTrainer-form-Pick-Trainer">
                  <div className="form-add-pick-trainer">
                    <div className="form-pick-trainer-admin">
                      <div>Trainer/Admin</div>
                      <select name="" id="" onChange={changeTrainer}>
                        <option value="Trainer">Trainer</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                    <div className="form-pick-user">
                      <div>User</div>
                      <select name="" id="" onChange={changeUser}>
                        {filterAllUser.map((item, index) => (
                          <option selected={item == remainUser} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-btn-add-container">
                      <button
                        className="form-btn-add"
                        onClick={(e) => addNewUser(e)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="picked-user-container-update">
                  {totalUser?.map((item, index) => (
                    <div className="picked-user-item">
                      <div>
                        Name: {item.name}
                        <br />
                        Day of birth: {item.dob}
                        <br />
                        <div className="picked-user-role-container">
                          Role:{" "}
                          <div
                            className={`picked-user-role ${
                              item.userType === "Admin" ? "admin" : "trainer"
                            }`}
                          >
                            {item.userType}
                          </div>
                        </div>
                      </div>
                      <div>
                        <button value={item.id} onClick={deleteUser}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="user-type">
            <label htmlFor="">Training program</label>
            <br />
            <select
              className="user-type-select"
              onChange={changeTrainingProgram_id}
            >
              {listTrainingProgram?.map((item, index) => {
                return (
                  <option
                    value={item.training_code}
                    key={item.training_code}
                    selected={
                      thisClass.trainingProgram_id == item.training_code
                    }
                  >
                    {item.training_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="btn-action-form">
            <button type="submit" className="btn-action-save" onClick={update}>
              Save
            </button>
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default UpdateClass;
