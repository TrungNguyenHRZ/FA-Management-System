package com.example.BE.repository;

import com.example.BE.model.dto.response.TrainingProgramResponse;
import com.example.BE.model.entity.TrainingProgram;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrainingProgramRepository extends JpaRepository<TrainingProgram, Integer> {
    @Query("SELECT tp FROM TrainingProgram tp LEFT JOIN FETCH tp.syllabus WHERE tp.training_name LIKE %?1%")
    List<TrainingProgramResponse> findByTrainingName(@Param("name") String name);

    @Query("SELECT tp FROM TrainingProgram tp LEFT JOIN FETCH tp.syllabus WHERE tp.training_name LIKE %?1% OR tp.create_by LIKE %?2%")
    List<TrainingProgramResponse> findTPByKeyword(@Param("keyword1") String keyword1, @Param("keyword2") String keyword2);
}
