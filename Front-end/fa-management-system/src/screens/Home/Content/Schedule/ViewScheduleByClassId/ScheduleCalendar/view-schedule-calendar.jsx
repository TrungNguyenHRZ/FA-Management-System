import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const ViewScheduleCalendar = ({ scheduleList, classById }) => {
  const localizer = momentLocalizer(moment);
  const events = scheduleList.map((schedule) => ({
    id: schedule.schedule_id,
    title: `${classById.className}`,
    start: new Date(`${schedule.day}T${schedule.startTime}`),
    end: new Date(`${schedule.day}T${schedule.endTime}`),
  }));

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default ViewScheduleCalendar;
