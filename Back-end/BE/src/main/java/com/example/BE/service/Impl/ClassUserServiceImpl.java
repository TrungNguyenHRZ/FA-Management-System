package com.example.BE.service.Impl;

import com.example.BE.model.dto.ClassUserDTO;
import com.example.BE.model.entity.ClassUser;
import com.example.BE.model.entity.ClassUserId;
import com.example.BE.repository.ClassUserRepository;
import com.example.BE.service.ClassService;
import com.example.BE.service.ClassUserService;
import com.example.BE.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Override
    public ClassUser update(ClassUser classUser, int userId, int classId, String userType) {
        ClassUserId newClassUserId = new ClassUserId(userId, classId);

        // Cập nhật ClassUserId của đối tượng ClassUser
        classUser.setId(newClassUserId);

        // Cập nhật UserType của đối tượng ClassUser
        classUser.setUserType(userType);

        // Lưu lại đối tượng đã cập nhật
        return classUserRepository.save(classUser);
    }

    @Override
    public ClassUser getClassUserById(int userId, int classId) {
        return classUserRepository.findByClassUserId(userId, classId);
    }
}
