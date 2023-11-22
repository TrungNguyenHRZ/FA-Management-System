import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import apiClassInstance from "../../../../../service/api-class";
import apiTrainingProgramInstance from "../../../../../service/ClassApi/api-trainingProgram";
import apiUserInstance from "../../../../../service/api-user";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import "./pick-trainer.css";
import { useNavigate } from "react-router";
import Authorization from "../../../../Authentication/Auth";

const PickTrainer = ({ showForm1, closeForm1, classId, updateForm1 }) => {
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

  const addAll = (e) => {};

  return (
    <div className="pickTrainer-form-container">
      <div>
        <h1>Create Multiple Trainer</h1>
      </div>

      <br />

      <div className="pickTrainer-form-Pick-container">
        <div>
          <div>
            <h1>Pick Trainer / Admin</h1>
          </div>
          <div className="pickTrainer-form-Pick-Trainer">
            <div>
              <div>Trainer/Admin</div>
              <select name="" id="" onChange={changeTrainer}>
                <option value="Trainer">Trainer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <div>User</div>
              <select name="" id="" onChange={changeUser}>
                {filterAllUser.map((item, index) => (
                  <option selected={item == remainUser} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button onClick={(e) => addNewUser(e)}>Add</button>
            </div>
          </div>
        </div>
        <div>-----------------------</div>
        <div>
          <div>
            <h1>User Picked</h1>
          </div>
          <div>
            {totalUser.map((item, index) => (
              <div>
                <div>
                  {item.name} | {item.dob} | {item.userType}
                </div>
                <button value={item.id} onClick={deleteUser}>
                  delete
                </button>
                <div>------------------------------------------</div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={addAll}>Submit</button>
      </div>
    </div>
  );
};

export default PickTrainer;
