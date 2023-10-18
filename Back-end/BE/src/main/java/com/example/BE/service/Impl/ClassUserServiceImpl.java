package com.example.BE.service.Impl;

import com.example.BE.model.dto.ClassUserDTO;
import com.example.BE.model.entity.ClassUser;
import com.example.BE.repository.ClassUserRepository;
import com.example.BE.service.ClassUserService;
import com.example.BE.util.HibernateUtils;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.Query;

import java.util.List;

@Service
public class ClassUserServiceImpl implements ClassUserService {
    @Autowired
    ClassUserRepository classUserRepository;
//    @Override
//    public List<ClassUser> getAll() {
//        return classUserRepository.findClassUsers();
//    }
    @Override
    public List<ClassUser> getAllClassUserList() {
        return classUserRepository.findAll();
    }

}
