package com.example.BE.repository;


import java.sql.Date;
// import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.example.BE.model.entity.Syllabus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SyllabusRepository extends JpaRepository<Syllabus, Integer> {
    //Search theo topic code, topic name,
    @Query(value = "Select * from syllabus where topic_code like %:keyword% or topic_name like %:keyword%  or training_principles like %:keyword%"
        , nativeQuery = true)
    List<Syllabus> getSyllabusListByKeyword(String keyword);


	@Query(value = "Select * from syllabus where create_date = :date",nativeQuery = true)
	List<Syllabus> getSyllabusByCreateDate(String date);

	@Query(value = "Select * from syllabus where userid = :userid",
	nativeQuery = true)
	Syllabus getSyllabusByUser(int userid);

	@Query(value = "Select * from syllabus where topic_code = :topicCode",
	nativeQuery = true)
	Syllabus getSyllabusByTopicCode(int topicCode);

	@Query("Select sy from Syllabus sy JOIN FETCH sy.syllabus_unit where sy.topic_code = :topic_code")
	Optional<Syllabus> getSyllabusWithTrainingUnit(@Param("topic_code") Integer topic_code);

	@Query(value = "select * from syllabus order by create_date desc",
	nativeQuery = true)
	List<Syllabus> getSyllabusDescDate();
}
