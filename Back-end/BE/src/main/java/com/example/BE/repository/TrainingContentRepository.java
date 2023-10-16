package com.example.BE.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.BE.model.entity.TrainingContent;

public interface TrainingContentRepository extends JpaRepository<TrainingContent,Integer> {
	
	@Query(value="Select * from training_content where unit_code = :code",
	nativeQuery = true)
	List<TrainingContent> getTrainingContentByUnitCode(int code);

	// List<TrainingContent> saveAll();
}
