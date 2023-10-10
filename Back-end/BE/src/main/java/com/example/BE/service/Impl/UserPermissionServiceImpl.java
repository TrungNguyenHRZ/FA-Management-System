package com.example.BE.service.Impl;

import com.example.BE.enums.Permission;
import com.example.BE.enums.Role;
import com.example.BE.model.entity.UserPermission;
import com.example.BE.repository.UserPermissionRepository;
import com.example.BE.service.UserPermissionService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserPermissionServiceImpl implements UserPermissionService {

    private final UserPermissionRepository userPermissionRepository;



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
        userPermission = userPermissionRepository.findFirstByRole(Role.CLASS_ADMIN.getRole()).orElse(null);
        if(Objects.isNull(userPermission)){
            userPermission = new UserPermission();
            userPermission.setPermissionId(2);
            userPermission.setRole(Role.CLASS_ADMIN.getRole());
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

    }
}
