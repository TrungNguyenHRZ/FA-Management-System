package com.example.BE.repository;

import com.example.BE.model.entity.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface ClassRepository extends JpaRepository<Class, Integer> {

}
