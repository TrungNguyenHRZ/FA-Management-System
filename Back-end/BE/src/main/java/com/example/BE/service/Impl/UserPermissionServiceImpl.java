package com.example.BE.service.Impl;

import com.example.BE.enums.Gender;
import com.example.BE.enums.Permission;
import com.example.BE.enums.Role;
import com.example.BE.model.entity.User;
import com.example.BE.model.entity.UserPermission;
import com.example.BE.repository.UserPermissionRepository;
import com.example.BE.repository.UserRepository;
import com.example.BE.service.UserPermissionService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserPermissionServiceImpl implements UserPermissionService {

    private final UserPermissionRepository userPermissionRepository;
    private final UserRepository userRepository;


    @PostConstruct
    public void importPermissionDefault(){
        UserPermission userPermission = userPermissionRepository.findFirstByRole(Role.SUPER_ADMIN.getRole()).orElse(null);
        if(Objects.isNull(userPermission)){
            userPermission = new UserPermission();
            userPermission.setPermissionId(1);
            userPermission.setRole(Role.SUPER_ADMIN.getRole());
            userPermission.setUserManagement(Permission.FULL_ACCESS.getPermission());
            userPermission.setTrainingProgram(Permission.FULL_ACCESS.getPermission());
            userPermission.setSyllabus(Permission.FULL_ACCESS.getPermission());
            userPermission.setClassName(Permission.FULL_ACCESS.getPermission());
            userPermission.setMaterial(Permission.FULL_ACCESS.getPermission());
            userPermissionRepository.save(userPermission);
        }
        userPermission = userPermissionRepository.findFirstByRole(Role.ADMIN.getRole()).orElse(null);
        if(Objects.isNull(userPermission)){
            userPermission = new UserPermission();
            userPermission.setPermissionId(2);
            userPermission.setRole(Role.ADMIN.getRole());
            userPermission.setUserManagement(Permission.ACCESS_DENIED.getPermission());
            userPermission.setTrainingProgram(Permission.FULL_ACCESS.getPermission());
            userPermission.setSyllabus(Permission.FULL_ACCESS.getPermission());
            userPermission.setClassName(Permission.FULL_ACCESS.getPermission());
            userPermission.setMaterial(Permission.FULL_ACCESS.getPermission());
            userPermissionRepository.save(userPermission);
        }

        userPermission = userPermissionRepository.findFirstByRole(Role.TRAINER.getRole()).orElse(null);
        if(Objects.isNull(userPermission)){
            userPermission = new UserPermission();
            userPermission.setPermissionId(3);
            userPermission.setRole(Role.TRAINER.getRole());
            userPermission.setUserManagement(Permission.ACCESS_DENIED.getPermission());
            userPermission.setTrainingProgram(Permission.VIEW.getPermission());
            userPermission.setSyllabus(Permission.FULL_ACCESS.getPermission());
            userPermission.setClassName(Permission.VIEW.getPermission());
            userPermission.setMaterial(Permission.CREATE.getPermission());
            userPermissionRepository.save(userPermission);
        }

//        User user = userRepository.findByEmail("Admin@Email.com").orElse(null);
//        UserPermission userPermissionSa = userPermissionRepository.findFirstByRole(Role.SUPER_ADMIN.getRole()).orElse(null);
//        if(Objects.isNull(user)){
//            user = new User();
//            user.setName("admin");
//            user.setCreatedDate(new Date());
//            user.setPhone("0300000000");
//            user.setDob(new Date());
//            user.setGender(Gender.MALE.getGender());
//            user.setEmail("Admin@Email.com");
//            user.setStatus(true);
//            user.setPermission(userPermissionSa);
//            user.setUserId(1);
//            user.setUserIdSearch(String.valueOf(1));
//            user.setPassword("Password123@");
//            user = userRepository.save(user);
//        }

    }
}
