import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiScheduleInstance from "../../../../../service/api-schedule";
import ViewScheduleCalendar from "./ScheduleCalendar/view-schedule-calendar";
import "./view-schedule.css";
import apiClassInstance from "../../../../../service/api-class";
const ViewScheduleByClassId = () => {
  const [scheduleList, setScheduleList] = useState([]);
  const [classById, setClassById] = useState({});
  const paramName = useParams();

  useEffect(() => {
    apiScheduleInstance
      .get(`/getScheduleByClassId?id=${paramName.id}`)
      .then((response) => {
        setScheduleList(response.data.payload);
      })
      .catch((error) => {
        console.error("Error at view-schedule.jsx: " + error);
      });

    apiClassInstance.get(`/${paramName.id}`).then((response) => {
      console.log(response.data);
      setClassById(response.data);
    });
  }, []);
  return (
    <div className="view-schedule-by-class-container">
      <div className="view-schedule-by-class-header">
        <div className="view-schedule-by-class-title">
          {classById.className || "Null"}
        </div>
        <div>Create at: {classById.createdDate || "Null"}</div>
        <div>Create by: {classById.create_by || "Null"}</div>
        <div>FSU: {classById.fsu || "Null"}</div>
      </div>
      <div className="view-schedule-by-class-body">
        <div>
          {scheduleList && scheduleList.length > 0 ? (
            <ViewScheduleCalendar
              scheduleList={scheduleList}
              classById={classById}
            />
          ) : (
            <div>No data</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewScheduleByClassId;
