package com.example.BE.repository;

import com.example.BE.model.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
}
