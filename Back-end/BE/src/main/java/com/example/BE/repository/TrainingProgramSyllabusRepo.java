package com.example.BE.repository;

import com.example.BE.model.entity.TrainingProgramSyllabus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TrainingProgramSyllabusRepo extends JpaRepository<TrainingProgramSyllabus, Integer> {

    @Query(value = "Select A.topic_code,create_by,create_date,modified_by,modified_date,priority,publish_status,technical_group,topic_name,topic_outline,training_audience,training_materials,training_principles,version,training_program_code,sequence,userid from training_program_syllabus as A join syllabus as B on A.topic_code = B.topic_code where B.topic_code = :num",
        nativeQuery = true)
    public List<TrainingProgramSyllabus> getSyllabus(int num);
    // List<TrainingProgramSyllabus> findByIdTopicCode(int code);
}
