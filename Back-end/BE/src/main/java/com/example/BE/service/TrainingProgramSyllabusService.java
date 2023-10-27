package com.example.BE.service;

import com.example.BE.model.dto.response.TrainingProgramSyllabusResponse;
import com.example.BE.model.entity.TrainingProgramSyllabus;

import java.util.List;

public interface TrainingProgramSyllabusService {
    List<TrainingProgramSyllabus> findAllTPS();
    TrainingProgramSyllabus saveTPS(TrainingProgramSyllabus TPS);
    TrainingProgramSyllabus convert(TrainingProgramSyllabusResponse tpsRes);
}
