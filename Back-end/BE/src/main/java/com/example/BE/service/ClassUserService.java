package com.example.BE.service;

import com.example.BE.model.dto.ClassUserDTO;
import com.example.BE.model.dto.response.ClassResponse;
import com.example.BE.model.entity.Class;
import com.example.BE.model.entity.ClassUser;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClassUserService {
    List<ClassUser> getAllClassUserList();
    ClassUser saveClassUser(ClassUser cu);
    ClassUser convert(ClassUserDTO c);
}
