package com.example.BE.repository;

import com.example.BE.model.entity.TrainingProgramSyllabus;
import com.example.BE.model.entity.TrainingProgramSyllabusId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TrainingProgramSyllabusRepo extends JpaRepository<TrainingProgramSyllabus, TrainingProgramSyllabusId> {

    @Query(value = "Select A.topic_code,create_by,create_date,modified_by,modified_date,priority,publish_status,technical_group,topic_name,topic_outline,training_audience,training_materials,training_principles,version,training_program_code,sequence,userid from training_program_syllabus as A join syllabus as B on A.topic_code = B.topic_code where B.topic_code = :num",
        nativeQuery = true)
    public List<TrainingProgramSyllabus> getSyllabus(int num);
    // List<TrainingProgramSyllabus> findByIdTopicCode(int code);

    @Query("SELECT tps FROM TrainingProgramSyllabus tps WHERE tps.id.training_program_code = :training_code AND tps.id.topic_code = :topicCode")
    public TrainingProgramSyllabus findByProgramAndProgram_topic(@Param("training_code") int training_code,@Param("topicCode") int topicCode);

    @Query(value= "select * from training_program_syllabus where topic_code = :num",
    nativeQuery = true)
     public List<TrainingProgramSyllabus> getTrainingPrograms(int num);
}
