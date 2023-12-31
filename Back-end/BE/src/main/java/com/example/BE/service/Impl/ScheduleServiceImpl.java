package com.example.BE.service.Impl;

import com.example.BE.exception.NotFoundException;
import com.example.BE.model.dto.response.ScheduleResponse;
import com.example.BE.model.entity.Schedule;
import com.example.BE.repository.ScheduleRepository;
import com.example.BE.service.ClassService;
import com.example.BE.service.ScheduleService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

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

    @Override
    public List<ScheduleResponse> findScheduleByClassId(int id) {
        return scheduleRepository.findScheduleByClassId(id);
    }

    @Override
    public Schedule findById(int id) {
        return scheduleRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteScheduleById(int sid) {
        scheduleRepository.deleteById(sid);
    }
    @Override
    public List<ScheduleResponse> sortScheduleByDate(List<ScheduleResponse> scheduleList) {
        // Sắp xếp lại danh sách lịch học theo ngày
        Collections.sort(scheduleList, Comparator.comparing(ScheduleResponse::getDay));

        // Trả về danh sách lịch học đã được sắp xếp
        return scheduleList;
    }
    @Override
    public Schedule update(Schedule schedule) {
        Schedule existingSchedule = scheduleRepository.findById(schedule.getSchedule_id()).orElse(null);
        if (existingSchedule == null) {
            throw new NotFoundException("Not Found!!!");
        }
        if(schedule.getStartTime()!=null){
            existingSchedule.setStartTime(schedule.getStartTime());

        }
        if(schedule.getEndTime()!=null){
            existingSchedule.setEndTime(schedule.getEndTime());

        }
        if(schedule.getDay()!=null){
            existingSchedule.setDay(schedule.getDay());

        }
        if(schedule.getClazz()!=null){
            existingSchedule.setClazz(schedule.getClazz());
        }

        return scheduleRepository.save(existingSchedule);
    }
}
