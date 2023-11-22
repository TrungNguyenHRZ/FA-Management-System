package com.example.BE.repository;

import com.example.BE.model.dto.response.ClassResponse;
import com.example.BE.model.entity.Class;
import com.example.BE.model.entity.TrainingProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public interface ClassRepository extends JpaRepository<Class, Integer> {
    Class searchByClassName(String className);

    Class searchByClassCode(String classCode);

    @Query("SELECT c FROM Class c WHERE c.start_date >= :startDate AND c.end_date <= :endDate ")
    List<ClassResponse> findClassesInDateRange(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
    @Query("SELECT c FROM Class c WHERE c.className LIKE %?1% OR c.classCode LIKE %?2%")
    List<ClassResponse> findClassesByKeyword(@Param("keyword1") String keyword1, @Param("keyword2") String keyword2);
    @Query("SELECT c FROM Class c WHERE c.status = %?1%")
    List<Class> findClassesByStatus(@Param("keyword1") String keyword1);
    @Query("SELECT c FROM Class c WHERE c.program_class = ?1")
    List<Class> findClassesByTrainingProgramId(@Param("keyword1") int keyword1);
    @Query("SELECT c FROM Class c WHERE c.program_class = ?1 AND c.status = ?2")
    List<Class> findByProgram_classAndStatus(TrainingProgram program_class, String status);
    @Query("SELECT c FROM Class c WHERE c.program_class = :program")
    List<Class> findByProgram_class(@Param("program") TrainingProgram trainingProgram);

    @Query("SELECT c FROM Class c WHERE c.fsu = ?1")
    List<ClassResponse> findClassesByFSU(@Param("keyword1") String keyword1);

    @Query("SELECT c FROM Class c WHERE c.location = ?1")
    List<ClassResponse> findClassesBylocation(@Param("keyword1") String keyword1);

//    @Query("SELECT t1_0.program_class, t1_0.classId, t1_0.classCode, t1_0.className, t1_0.duration, t1_0.status, t1_0.location, t1_0.fsu, t1_0.start_date, t1_0.end_date, t1_0.create_by, t1_0.createdDate, t1_0.modified_date, t1_0.modified_by FROM Class t1_0 WHERE t1_0.program_class = :programId")
//    List<Class> findByProgram(@Param("programId") int programId);
}
