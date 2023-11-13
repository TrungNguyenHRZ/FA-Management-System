package com.example.BE.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BE.model.entity.LearningObject;

public interface LearningObjectRepository extends JpaRepository<LearningObject, Integer> {
	
}
