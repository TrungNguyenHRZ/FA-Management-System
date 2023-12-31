package com.example.BE.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.BE.model.entity.Syllabus;
import com.example.BE.model.entity.TrainingContent;

public interface TrainingContentRepository extends JpaRepository<TrainingContent,Integer> {
	
	@Query(value="Select * from training_content where unit_code = :code",
	nativeQuery = true)
	List<TrainingContent> getTrainingContentByUnitCode(int code);

	// List<TrainingContent> saveAll();

	
	@Query(value="select top 1 * from training_content order by content_id desc",
	nativeQuery = true)
	TrainingContent getLastContent();

	@Query(value="select * from training_content where content_id = :id",
	nativeQuery = true)
	TrainingContent getContentById(int id);

	 @Modifying
    @Transactional
	void deleteByContentId(int id);
}
