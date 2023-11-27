import React, { useEffect, useState } from "react";
import apiClassInstance from "../../../../../service/api-class";
import apiUserInstance from "../../../../../service/api-user";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import "./pick-trainer.css";
import { useNavigate } from "react-router";
import Authorization from "../../../../Authentication/Auth";

const PickTrainer = ({ showForm, closeForm, classId, updateForm }) => {
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
      })
      .catch((error) => {
        console.error(error);
      });
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
      setTotalUser([...totalUser, remainUser]);
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

  const addAll = (e) => {
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
  };

  return (
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
                <button className="form-btn-add" onClick={(e) => addNewUser(e)}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h1>User Picked</h1>
          </div>
          <div className="picked-user-container">
            {totalUser.map((item, index) => (
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
        <button className="form-btn-submit-picked" onClick={addAll}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PickTrainer;
