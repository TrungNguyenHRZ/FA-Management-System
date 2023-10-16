package com.example.BE.repository;

import com.example.BE.model.entity.TrainingProgram;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrainingProgramRepository extends JpaRepository<TrainingProgram, Integer> {
    @Query("SELECT t FROM TrainingProgram t WHERE t.training_name = :name")
    List<TrainingProgram> findByTrainingName(@Param("name") String trainingName);
}
