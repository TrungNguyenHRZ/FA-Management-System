package com.example.BE.repository;

import com.example.BE.model.dto.response.ClassResponse;
import com.example.BE.model.dto.response.ScheduleResponse;
import com.example.BE.model.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    @Query("SELECT s FROM Schedule s WHERE s.clazz.classId = ?1")
    List<ScheduleResponse> findScheduleByClassId(@Param("classId") int classId);
//    @Query("DELETE FROM Schedule s WHERE s.schedule_id = ?1")
//    void deleteScheduleById(@Param("scheduleId") int scheduleId);
}
