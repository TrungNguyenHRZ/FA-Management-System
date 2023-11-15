package com.example.BE.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.BE.model.entity.TrainingUnit;
import org.springframework.data.repository.query.Param;

public interface TrainingUnitRepository extends JpaRepository<TrainingUnit,Integer> {
	
	@Query(value="Select * from training_unit where topic_code = :code", nativeQuery = true)
	public List<TrainingUnit> getTrainingUnitsByTopicCode(int code);

	@Query(value="Select * from training_unit where unit_code = :code" 
	,nativeQuery = true)
	public TrainingUnit getTrainingUnitByUnitCode(int code);

	@Query(value= "select top 1 * from training_unit order by unit_code desc",
	nativeQuery = true)
	TrainingUnit getLastTrainingUnit();

	@Query(value = "SELECT MAX(tu.day_number) FROM training_unit tu WHERE tu.topic_code = :topic_code", nativeQuery = true)
	int findMaxDayNumberByTopicCode(@Param("topic_code") int topic_code);
}
