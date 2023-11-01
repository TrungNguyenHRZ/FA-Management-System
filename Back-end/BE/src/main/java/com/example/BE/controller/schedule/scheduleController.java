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


}
