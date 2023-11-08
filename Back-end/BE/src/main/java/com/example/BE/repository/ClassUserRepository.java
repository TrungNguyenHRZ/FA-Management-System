package com.example.BE.repository;

import com.example.BE.model.entity.ClassUser;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClassUserRepository extends JpaRepository<ClassUser, Integer>{
    @Query("SELECT c FROM ClassUser c WHERE c.class_object.id = :id")
    List<ClassUser> findAllClassUserByClassId(@Param("id") int id);


    @Query("SELECT c FROM ClassUser c WHERE c.id.userId = :userId AND c.id.classId = :classId")
    ClassUser findByClassUserId(@Param("userId") int userId, @Param("classId") int classId);
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM user_class WHERE user_id = :userId AND class_id = :classId", nativeQuery = true)
    void deleteByUserIdAndClassId(@Param("userId") int userId, @Param("classId") int classId);
}
