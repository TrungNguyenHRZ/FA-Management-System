package com.example.BE.service.Impl;

import com.example.BE.model.entity.TrainingProgram;
import com.example.BE.repository.ClassRepository;
import com.example.BE.repository.TrainingProgramRepository;
import com.example.BE.service.TrainingProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingProgramServiceImpl implements TrainingProgramService {
    @Autowired
    TrainingProgramRepository trainingProgramRepository;

    @Override
    public TrainingProgram findById(int id) {
        return trainingProgramRepository.findById(id).orElse(null);
    }

    @Override
    public List<TrainingProgram> getAllTrainingProgram() {
        return trainingProgramRepository.findAll();
    }
}
