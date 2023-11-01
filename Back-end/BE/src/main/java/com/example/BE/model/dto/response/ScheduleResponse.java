package com.example.BE.model.dto.response;

import com.example.BE.model.entity.Class;
import com.example.BE.model.entity.Schedule;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;
@Setter
@Getter
public class ScheduleResponse {
    private int schedule_id;

    private LocalTime startTime;

    private LocalTime endTime;

    private Date day;
    private int class_id;
    public ScheduleResponse(Schedule s){
        this.schedule_id = s.getSchedule_id();
        this.startTime = s.getStartTime();
        this.endTime = s.getEndTime();
        this.day = s.getDay();
        if(s.getClazz() != null){
            this.class_id = s.getClazz().getClassId();
        }
    }
}
