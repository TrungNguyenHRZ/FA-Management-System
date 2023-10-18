package com.example.BE.service;

import com.example.BE.model.dto.ClassUserDTO;
import com.example.BE.model.entity.ClassUser;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClassUserService {
//    List<ClassUser> getAll();
    List<ClassUser> getAllClassUserList();
}
