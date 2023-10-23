package com.example.BE.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.BE.model.entity.SyllabusObject;

public interface SyllabusObjectRepository extends JpaRepository<SyllabusObject,Integer> {
	
	@Query(value="select * from syllabus_object where topic_code = :code",
	nativeQuery = true)
	List<SyllabusObject> getSyllabusObjectBySyllabusCode(int code);
}
