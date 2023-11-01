package com.example.BE.service;

import com.example.BE.model.entity.Class;
import com.example.BE.model.entity.Schedule;

import java.util.List;

public interface ScheduleService {
    List<Schedule> findAllSchedule();
}
