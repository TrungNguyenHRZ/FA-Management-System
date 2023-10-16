package com.example.BE.repository;

import com.example.BE.model.dto.response.ClassResponse;
import com.example.BE.model.entity.Class;
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

    @Query("SELECT c FROM Class c WHERE c.start_date >= :startDate AND c.end_date <= :endDate")
    List<ClassResponse> findClassesInDateRange(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
