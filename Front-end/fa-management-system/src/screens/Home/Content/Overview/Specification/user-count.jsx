import React, { useEffect, useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import "./specification.css";
import CountUp from "react-countup";
import apiUserInstance from "../../../../../service/api-user";
const CountUser = () => {
  const [countUser, setCountUser] = useState(0);

  useEffect(() => {
    apiUserInstance
      .get("/all")
      .then((response) => {
        setCountUser(response.data.userResponseList.length);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return (
    <div className="specificate-container">
      <div className="amount">
        <div className="count">
          <CountUp end={countUser} />
        </div>
        <div className="title">User</div>
      </div>
      <div className="icon icon-syllabus">
        <FaUserGroup />
      </div>
    </div>
  );
};

export default CountUser;
