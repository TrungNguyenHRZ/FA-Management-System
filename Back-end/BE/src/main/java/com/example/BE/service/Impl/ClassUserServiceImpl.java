package com.example.BE.service.Impl;

import com.example.BE.model.dto.ClassUserDTO;
import com.example.BE.model.entity.ClassUser;
import com.example.BE.repository.ClassUserRepository;
import com.example.BE.service.ClassService;
import com.example.BE.service.ClassUserService;
import com.example.BE.service.UserService;
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
    @Autowired
    UserService userService;
    @Autowired
    ClassService classService;
    @Override
    public List<ClassUser> getAllClassUserList() {
        return classUserRepository.findAll();
    }

    @Override
    public ClassUser saveClassUser(ClassUser cu) {
        return classUserRepository.saveAndFlush(cu);
    }

    @Override
    public ClassUser convert(ClassUserDTO c) {
       ClassUser cu = new ClassUser();
       cu.setUser(userService.getUserById2(c.getUserId()));
       cu.setClass_object(classService.findById(c.getClassId()));
       return cu;
    }


}
