package com.example.BE.service.Impl;

import com.example.BE.model.entity.Schedule;
import com.example.BE.repository.ScheduleRepository;
import com.example.BE.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {
    @Autowired
    ScheduleRepository scheduleRepository;
    @Override
    public List<Schedule> findAllSchedule() {
        return scheduleRepository.findAll();
    }
}
