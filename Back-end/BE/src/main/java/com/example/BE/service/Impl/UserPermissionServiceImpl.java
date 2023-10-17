package com.example.BE.service.Impl;

import com.example.BE.dto.request.userPermission.UpdatePermissionRequest;
import com.example.BE.dto.response.userPermission.UserPermissionResponse;
import com.example.BE.enums.ErrorMessage;
import com.example.BE.enums.Permission;
import com.example.BE.enums.Role;
import com.example.BE.handle.BusinessException;
import com.example.BE.model.entity.User;
import com.example.BE.model.entity.UserPermission;
import com.example.BE.repository.UserPermissionRepository;
import com.example.BE.repository.UserRepository;
import com.example.BE.security.SecurityUtils;
import com.example.BE.service.UserPermissionService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserPermissionServiceImpl implements UserPermissionService {

    private final UserPermissionRepository userPermissionRepository;
    private final UserRepository userRepository;


    @PostConstruct
    public void importPermissionDefault() {
        UserPermission userPermission = userPermissionRepository.findFirstByRole(Role.SUPER_ADMIN.getRole()).orElse(null);
        if (Objects.isNull(userPermission)) {
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
        if (Objects.isNull(userPermission)) {
            userPermission = new UserPermission();
            userPermission.setPermissionId(2);
            userPermission.setRole(Role.ADMIN.getRole());
            userPermission.setUserManagement(Permission.VIEW.getPermission());
            userPermission.setTrainingProgram(Permission.FULL_ACCESS.getPermission());
            userPermission.setSyllabus(Permission.FULL_ACCESS.getPermission());
            userPermission.setClassName(Permission.FULL_ACCESS.getPermission());
            userPermission.setMaterial(Permission.FULL_ACCESS.getPermission());
            userPermissionRepository.save(userPermission);
        }

        userPermission = userPermissionRepository.findFirstByRole(Role.TRAINER.getRole()).orElse(null);
        if (Objects.isNull(userPermission)) {
            userPermission = new UserPermission();
            userPermission.setPermissionId(3);
            userPermission.setRole(Role.TRAINER.getRole());
            userPermission.setUserManagement(Permission.VIEW.getPermission());
            userPermission.setTrainingProgram(Permission.VIEW.getPermission());
            userPermission.setSyllabus(Permission.FULL_ACCESS.getPermission());
            userPermission.setClassName(Permission.VIEW.getPermission());
            userPermission.setMaterial(Permission.VIEW.getPermission());
            userPermissionRepository.save(userPermission);
        }
    }


    @Override
    public boolean checkCreatePermission(String userPermission) {
        if (Permission.CREATE.getPermission().equals(userPermission) || Permission.FULL_ACCESS.getPermission().equals(userPermission)) {
            return true;
        }
        return false;
    }

    @Override
    public boolean checkReadPermission(String userPermission) {
        if (Permission.VIEW.getPermission().equals(userPermission) || Permission.FULL_ACCESS.getPermission().equals(userPermission)) {
            return true;
        }
        return false;
    }

    @Override
    public boolean checkUpdatePermission(String userPermission) {
        if (Permission.MODIFY.getPermission().equals(userPermission) || Permission.FULL_ACCESS.getPermission().equals(userPermission)) {
            return true;
        }
        return false;
    }


    @Override
    public boolean checkImportPermission(String userPermission) {
        if (Permission.FULL_ACCESS.getPermission().equals(userPermission)) {
            return true;
        }
        return false;
    }


    @Override
    public List<UserPermissionResponse> getAll() {
        List<UserPermission> permissions = userPermissionRepository.findAll();
        return permissions.stream().map(UserPermissionResponse::new).collect(Collectors.toList());
    }


    @Override
    public UserPermissionResponse updatePermission(UpdatePermissionRequest request) {
        log.info("Receive request change permission : {}", request.toString());
        String email = SecurityUtils.getUsernameAuth();
        log.info("User request have email: {}", email);
        User user = userRepository.findByEmail(email).orElse(null);
        if(Objects.isNull(user)){
            throw new BusinessException(ErrorMessage.USER_NOT_FOUND);
        }
        UserPermission userPermission = userPermissionRepository.findFirstByRole(request.getRoleUpdate().getRole()).orElse(null);
        if(Objects.isNull(userPermission)){
            throw new BusinessException(ErrorMessage.USER_PERMISSION_NOT_FOUND);
        }
        if(Role.SUPER_ADMIN.getRole().equals(userPermission.getRole())) {
            if(!Role.SUPER_ADMIN.getRole().equals(user.getPermission().getRole())) {
                throw new BusinessException(ErrorMessage.USER_DO_NOT_PERMISSION);
            }
        }

        if(Objects.nonNull(request.getClassName())){
            userPermission.setClassName(request.getClassName().getPermission());
        }

        if(Objects.nonNull(request.getSyllabus())){
            userPermission.setSyllabus(request.getSyllabus().getPermission());
        }

        if(Objects.nonNull(request.getMaterial())){
            userPermission.setMaterial(request.getMaterial().getPermission());
        }

        if(Objects.nonNull(request.getTrainingProgram())){
            userPermission.setTrainingProgram(request.getTrainingProgram().getPermission());
        }

        userPermission = userPermissionRepository.save(userPermission);
        return new UserPermissionResponse(userPermission);

    }
}
