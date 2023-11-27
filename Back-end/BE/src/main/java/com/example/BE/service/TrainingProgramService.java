package com.example.BE.service;

import com.example.BE.model.dto.response.TrainingProgramDetailResponse;
import com.example.BE.model.dto.response.TrainingProgramResponse;
import com.example.BE.model.entity.TrainingProgram;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service

public interface TrainingProgramService {

    List<TrainingProgramResponse> findAllTrainingProgram();

    List<TrainingProgramResponse> findAllTPForAdmin();

    TrainingProgram findById(int id);

    TrainingProgram findByIdWithToggleTrue(int id);

    List<TrainingProgramResponse> findByTrainingName(String name);

    TrainingProgram saveTrainingProgram(TrainingProgram trainingProgram);

    TrainingProgram convert(TrainingProgramResponse t);

    TrainingProgram updateTrainingProgram(TrainingProgram tp);

    TrainingProgram duplicate(TrainingProgram tp);

    List<TrainingProgramResponse> findTPByKeyword(String keyword);

    TrainingProgramDetailResponse getTrainingProgramDetail(int id);

    public String uploading(String fileName, MultipartFile file);

    public Resource downloading(String fileCode) throws IOException;

    public boolean softDelete(int id);

    public boolean reActivate(int id);
}
