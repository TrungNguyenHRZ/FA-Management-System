package com.example.BE.controller.schedule;

import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.dto.ClassUserDTO;
import com.example.BE.model.dto.response.ClassResponse;
import com.example.BE.model.dto.response.ScheduleResponse;
import com.example.BE.model.entity.*;
import com.example.BE.model.entity.Class;
import com.example.BE.repository.ClassUserRepository;
import com.example.BE.service.*;
import com.example.BE.util.ValidatorUtil;
import com.example.BE.validator.ClassValidator;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
@RestController
@RequestMapping("/schedule")
public class scheduleController {
    @Autowired
    ScheduleService scheduleService;
    @Autowired
    ClassService classService;
        @GetMapping(value = {"/all"})
        public ResponseEntity<ApiResponse<List<ScheduleResponse>>> getAllSchedule() {
            ApiResponse apiResponse = new ApiResponse();
            List<Schedule> ScheList = scheduleService.findAllSchedule();
            List<ScheduleResponse> result = new ArrayList<>();
            for (Schedule s :ScheList) {
                result.add(new ScheduleResponse(s));
            }
            apiResponse.ok(result);
            return ResponseEntity.ok(apiResponse);
        }
        @PostMapping(value = {"/create"})
        public ResponseEntity<ApiResponse<ScheduleResponse>> createSchedule(@RequestBody ScheduleResponse schedule) {
            ApiResponse apiResponse = new ApiResponse();
            Schedule savedSchedule = scheduleService.Create(scheduleService.convert(schedule));
            ScheduleResponse response = new ScheduleResponse(savedSchedule);
            apiResponse.ok(response);
            return ResponseEntity.ok(apiResponse);
        }
    @GetMapping(value = {"/getScheduleByClassId"})
    public ResponseEntity<ApiResponse<List<ScheduleResponse>>> getScheduleByClassId(@RequestParam int id) {
        ApiResponse apiResponse = new ApiResponse();
        List<ScheduleResponse> ScheList = scheduleService.findScheduleByClassId(id);
        apiResponse.ok(ScheList);
        return ResponseEntity.ok(apiResponse);
    }
    @PostMapping(value = {"/autoGenarateSchedule"})
    public ResponseEntity<ApiResponse<ScheduleResponse>> test1(@RequestBody ScheduleResponse schedule,@RequestParam int classid) {
        ApiResponse apiResponse = new ApiResponse();
        Class c = classService.findById(classid);
        List<ScheduleResponse> ScheList = scheduleService.findScheduleByClassId(classid);
        if(ScheList.size() < c.getDuration()){
            Date currentDate = schedule.getDay();
            // Using Calendar to extract the day

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(currentDate);
            int currentDay = calendar.get(Calendar.DAY_OF_MONTH);
            int updatedDay = currentDay + 7;
            // Updating the day in the Calendar
            calendar.set(Calendar.DAY_OF_MONTH, updatedDay);
            // Setting the updated Date back to the schedule object
            schedule.setDay(calendar.getTime());
            schedule.setClass_id(classid);
            Schedule savedSchedule = scheduleService.Create(scheduleService.convert(schedule));
            ScheduleResponse response = new ScheduleResponse(savedSchedule);
            apiResponse.ok(response);
        }else{
            apiResponse.error("Max duration reached!!!");
            return ResponseEntity.badRequest().body(apiResponse);
        }
        return ResponseEntity.ok(apiResponse);
    }
    @PostMapping(value = {"/TestautoGenarateSchedule"})
    public ResponseEntity<ApiResponse<List<ScheduleResponse>>> test1(@RequestBody ScheduleResponse schedule,@RequestParam int classid,@RequestParam int slotPerWeek) {
        ApiResponse apiResponse = new ApiResponse();
        Class c = classService.findById(classid);
        int duration = c.getDuration();
        List<ScheduleResponse> scheduleResponseList = new ArrayList<>();
        if(duration%slotPerWeek==0){
            int n = duration/slotPerWeek;
            //
            List<ScheduleResponse> ScheList = scheduleService.findScheduleByClassId(classid);
            for(int i = 0; i < n; i++)
            {
                Date currentDate = schedule.getDay();
                // Using Calendar to extract the day
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(currentDate);
                int currentDay = calendar.get(Calendar.DAY_OF_MONTH);
                int updatedDay = currentDay + 7*(i);
                // Updating the day in the Calendar
                calendar.set(Calendar.DAY_OF_MONTH, updatedDay);
                // Setting the updated Date back to the schedule object
                schedule.setDay(calendar.getTime());
                schedule.setClass_id(classid);
                Schedule savedSchedule = scheduleService.Create(scheduleService.convert(schedule));
                ScheduleResponse response = new ScheduleResponse(savedSchedule);
                scheduleResponseList.add(response);
            }
            apiResponse.ok(scheduleResponseList);
        }
        else if(duration%slotPerWeek!=0)
        {
            int maxDuration = duration;
            duration = duration+(slotPerWeek-(duration%slotPerWeek));
            int n = duration/slotPerWeek;
            for(int i = 0; i < n; i++)
            {
                Date currentDate = schedule.getDay();
                // Using Calendar to extract the day
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(currentDate);
                int currentDay = calendar.get(Calendar.DAY_OF_MONTH);
                int updatedDay = currentDay + 7*(i);
                // Updating the day in the Calendar
                calendar.set(Calendar.DAY_OF_MONTH, updatedDay);
                // Setting the updated Date back to the schedule object
                schedule.setDay(calendar.getTime());
                schedule.setClass_id(classid);
                Schedule savedSchedule = scheduleService.Create(scheduleService.convert(schedule));
                ScheduleResponse response = new ScheduleResponse(savedSchedule);
                List<ScheduleResponse> schedules = scheduleService.findScheduleByClassId(classid);
                scheduleResponseList = scheduleService.sortScheduleByDate(schedules);
                for (int j = scheduleResponseList.size() - 1; j >= 0; j--) {
                    if (j >= maxDuration) {
                        scheduleService.deleteScheduleById(scheduleResponseList.get(j).getSchedule_id());
                        scheduleResponseList.remove(j);
                    }
                }
            }
            apiResponse.ok(scheduleResponseList);
        }
        return ResponseEntity.ok(apiResponse);
    }
    @DeleteMapping(value = {"/delete"})
    public ResponseEntity<ApiResponse<ScheduleResponse>> delete(@RequestParam int scheduleid) {
        ApiResponse apiResponse = new ApiResponse();
        scheduleService.deleteScheduleById(scheduleid);
                apiResponse.error("Xoa r");
        return ResponseEntity.ok(apiResponse);
    }
    @PatchMapping(value = {"/update"})
    public ResponseEntity<ApiResponse<ScheduleResponse>> updateSchedule(@RequestBody Schedule schedule) {
        ApiResponse apiResponse = new ApiResponse();
        Schedule savedSchedule = scheduleService.Update(schedule);
        ScheduleResponse response = new ScheduleResponse(savedSchedule);
        apiResponse.ok(response);
        return ResponseEntity.ok(apiResponse);
    }
}
