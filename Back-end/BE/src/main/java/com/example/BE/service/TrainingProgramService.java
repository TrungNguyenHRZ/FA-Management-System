package com.example.BE.service;

import com.example.BE.model.dto.response.TrainingProgramResponse;
import com.example.BE.model.entity.TrainingProgram;
import org.springframework.stereotype.Service;

import java.util.List;
@Service

public interface TrainingProgramService {

    List<TrainingProgram> findAllTrainingProgram();

    TrainingProgram findById(int id);

    List<TrainingProgram> findByTrainingName(String name);

    TrainingProgram saveTrainingProgram(TrainingProgram trainingProgram);

//    List<TrainingProgram> findByNameLike(String name);

    TrainingProgram convert(TrainingProgramResponse t);

    TrainingProgram updateTrainingProgram(TrainingProgram tp);
}
