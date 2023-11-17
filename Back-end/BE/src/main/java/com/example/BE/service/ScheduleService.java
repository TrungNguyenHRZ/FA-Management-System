package com.example.BE.service;

import com.example.BE.model.dto.response.ScheduleResponse;
import com.example.BE.model.entity.Class;
import com.example.BE.model.entity.Schedule;

import java.util.List;

public interface ScheduleService {
    List<Schedule> findAllSchedule();
    Schedule Create(Schedule s);
    Schedule convert(ScheduleResponse s);
    List<ScheduleResponse> findScheduleByClassId(int id);
    void deleteScheduleById(int sid);
    List<ScheduleResponse> sortScheduleByDate(List<ScheduleResponse> scheduleList);
}
