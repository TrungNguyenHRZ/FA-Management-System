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
import java.util.Date;
import java.util.List;
@RestController
@RequestMapping("/schedule")
public class scheduleController {
    @Autowired
    ScheduleService scheduleService;
        @GetMapping(value = {"/all"})
        public ResponseEntity<ApiResponse<List<ScheduleResponse>>> getAllClass() {
            ApiResponse apiResponse = new ApiResponse();
            List<Schedule> ScheList = scheduleService.findAllSchedule();
            List<ScheduleResponse> result = new ArrayList<>();
            for (Schedule s :ScheList) {
                result.add(new ScheduleResponse(s));
            }
            apiResponse.ok(result);
            return ResponseEntity.ok(apiResponse);
        }
//    @PostMapping(value = {"/create"})
//    public ResponseEntity<ApiResponse<ScheduleResponse>> createSchedule(@RequestBody ScheduleResponse scheduleResponse) {
//        ApiResponse apiResponse = new ApiResponse();
//        Schedule savedSchedule = scheduleService.Create(scheduleResponse);
//        if (savedSchedule != null) {
//            apiResponse.ok(new ScheduleResponse(savedSchedule));
//            return ResponseEntity.ok(apiResponse);
//        } else {
//            apiResponse.error("Failed to create the schedule");
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
//        }
//    }
        @PostMapping(value = {"/create"})
        public ResponseEntity<ApiResponse<ScheduleResponse>> createSchedule(@RequestBody ScheduleResponse schedule) {
            ApiResponse apiResponse = new ApiResponse();
            Schedule savedSchedule = scheduleService.Create(scheduleService.convert(schedule));
            ScheduleResponse response = new ScheduleResponse(savedSchedule);
            apiResponse.ok(response);
            return ResponseEntity.ok(apiResponse);
        }
    @PostMapping("/test")
    public ResponseEntity<ApiResponse<ScheduleResponse[]>> createSchedules(@RequestBody ScheduleResponse[] schedules) {
        ApiResponse<ScheduleResponse[]> apiResponse = new ApiResponse<>();
        List<Schedule> savedSchedules = new ArrayList<>();

        for (ScheduleResponse schedule : schedules) {
            Schedule savedSchedule = scheduleService.Create(scheduleService.convert(schedule));
            savedSchedules.add(savedSchedule);
        }

        ScheduleResponse[] responses = new ScheduleResponse[savedSchedules.size()];
        for (int i = 0; i < savedSchedules.size(); i++) {
            responses[i] = new ScheduleResponse(savedSchedules.get(i));
        }

        apiResponse.ok(responses);
        return ResponseEntity.ok(apiResponse);
    }
}
