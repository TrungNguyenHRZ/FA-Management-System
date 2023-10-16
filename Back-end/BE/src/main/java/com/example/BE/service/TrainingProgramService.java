package com.example.BE.service;

import com.example.BE.model.entity.TrainingProgram;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public interface TrainingProgramService {
    TrainingProgram findById(int id);

    List<TrainingProgram> getAllTrainingProgram();
}
