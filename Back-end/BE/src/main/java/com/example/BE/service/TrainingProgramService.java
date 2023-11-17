package com.example.BE.service;

import com.example.BE.model.dto.response.TrainingProgramDetailResponse;
import com.example.BE.model.dto.response.TrainingProgramResponse;
import com.example.BE.model.entity.TrainingProgram;
import jakarta.mail.Quota;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service

public interface TrainingProgramService {

    List<TrainingProgramResponse> findAllTrainingProgram();

    TrainingProgram findById(int id);

    List<TrainingProgramResponse> findByTrainingName(String name);

    TrainingProgram saveTrainingProgram(TrainingProgram trainingProgram);

//    List<TrainingProgram> findByNameLike(String name);

    TrainingProgram convert(TrainingProgramResponse t);

    TrainingProgram updateTrainingProgram(TrainingProgram tp);

    TrainingProgram duplicate(TrainingProgram tp);

    List<TrainingProgramResponse> findTPByKeyword(String keyword);

    TrainingProgramDetailResponse getTrainingProgramDetail(int id);

    public String uploading(String fileName, MultipartFile file);

    public Resource downloading(String fileCode) throws IOException;


}
