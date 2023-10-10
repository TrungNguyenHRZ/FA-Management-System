package com.example.BE.repository;


import java.sql.Date;
// import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.BE.model.entity.Syllabus;

public interface SyllabusRepository  extends JpaRepository<Syllabus,Integer> {
	//Search theo topic code, topic name,
	@Query (value = "Select * from syllabus where topic_code like %:keyword% or topic_name like %:keyword%  or training_principles like %:keyword%"
	,nativeQuery = true)
	List<Syllabus> getSyllabusListByKeyword(String keyword);

	@Query(value = "Select * from syllabus where create_date = :date",nativeQuery = true)
	List<Syllabus> getSyllabusByCreateDate(String date);

	


}
