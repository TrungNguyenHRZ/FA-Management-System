package com.example.BE.controller.trainingProgram;

import com.example.BE.model.dto.ApiResponse;
import com.example.BE.model.entity.Class;
import com.example.BE.service.TrainingProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/TrainingProgram")
public class TrainingProgramController {
    @Autowired
    TrainingProgramService trainingProgramService;
    @GetMapping(value = {"/all"})
    public ResponseEntity<ApiResponse<List<Class>>> getAllTrainingProgram() {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.ok(trainingProgramService.getAllTrainingProgram());
        return ResponseEntity.ok(apiResponse);
    }
}
