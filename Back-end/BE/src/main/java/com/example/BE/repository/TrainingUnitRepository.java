package com.example.BE.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.BE.model.entity.TrainingUnit;

public interface TrainingUnitRepository extends JpaRepository<TrainingUnit,Integer> {
	
	@Query(value="Select * from training_unit where topic_code = :code", nativeQuery = true)
	public List<TrainingUnit> getTrainingUnitsByTopicCode(int code);

	@Query(value="Select * from training_unit where unit_code = :code" 
	,nativeQuery = true)
	public TrainingUnit getTrainingUnitByUnitCode(int code);
}
