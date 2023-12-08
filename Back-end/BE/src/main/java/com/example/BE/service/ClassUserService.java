package com.example.BE.service;

import com.example.BE.model.dto.ClassUserDTO;
import com.example.BE.model.entity.ClassUser;

import java.util.List;

public interface ClassUserService {
    List<ClassUser> getAllClassUserList();
    ClassUser saveClassUser(ClassUser cu);
    ClassUser convert(ClassUserDTO c);
    ClassUser update(ClassUser classUser, int userId, int classId, String userType);
    ClassUser getClassUserById(int userId, int classId);
    List<ClassUser> getClassUserListByClassId(int classId);
}
