package com.example.BE.repository;

import com.example.BE.model.dto.ClassUserDTO;
import com.example.BE.model.entity.ClassUser;
import com.example.BE.model.entity.ClassUserId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClassUserRepository extends JpaRepository<ClassUser, Integer>{
    @Query("SELECT c FROM ClassUser c WHERE c.class_object.id = :id")
    List<ClassUser> findAllClassUserByClassId(@Param("id") int id);


    
}
