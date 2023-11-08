package com.example.BE.service.Impl;

import com.example.BE.model.dto.response.ScheduleResponse;
import com.example.BE.model.entity.Schedule;
import com.example.BE.repository.ScheduleRepository;
import com.example.BE.service.ClassService;
import com.example.BE.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {
    @Autowired
    ScheduleRepository scheduleRepository;
    @Autowired
    ClassService classService;
    @Override
    public List<Schedule> findAllSchedule() {
        return scheduleRepository.findAll();
    }

    @Override
    public Schedule Create(Schedule s) {
        return scheduleRepository.save(s);
    }

    @Override
    public Schedule convert(ScheduleResponse s) {
        Schedule schedule = new Schedule();
        schedule.setSchedule_id(s.getSchedule_id());
        schedule.setStartTime(s.getStartTime());
        schedule.setEndTime(s.getEndTime());
        schedule.setDay(s.getDay());
        schedule.setClazz(classService.findById(s.getClass_id()));
        return schedule;
    }
}
