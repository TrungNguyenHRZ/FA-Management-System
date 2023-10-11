package com.example.BE.service;

import com.example.BE.model.entity.TrainingProgram;
import org.springframework.stereotype.Service;

@Service

public interface TrainingProgramService {
    TrainingProgram findById(int id);
}
