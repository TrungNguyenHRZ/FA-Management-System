package com.example.BE.model.dto.response;

import com.example.BE.model.entity.Class;
import com.example.BE.model.entity.Schedule;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.Date;
@Setter
@Getter
public class ScheduleResponse {

    protected int schedule_id;

    protected LocalTime startTime;

    protected LocalTime endTime;

    protected Date day;

    protected int class_id;
    public ScheduleResponse(Schedule s){
        this.schedule_id = s.getSchedule_id();
        this.startTime = s.getStartTime();
        this.endTime = s.getEndTime();
        this.day = s.getDay();
        if(s.getClazz() != null){
            this.class_id = s.getClazz().getClassId();
        }
    }
    public ScheduleResponse(){}
    private static String formatLocalTime(LocalTime localTime) {
        return String.format("%02d:%02d:%02d", localTime.getHour(), localTime.getMinute(), localTime.getSecond());
    }
}
