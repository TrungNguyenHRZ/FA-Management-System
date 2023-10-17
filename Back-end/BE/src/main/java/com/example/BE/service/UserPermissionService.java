package com.example.BE.service;


import com.example.BE.dto.request.userPermission.UpdatePermissionRequest;
import com.example.BE.dto.response.user.UserResponse;
import com.example.BE.dto.response.userPermission.UserPermissionResponse;

import java.util.List;

public interface UserPermissionService {

    boolean checkCreatePermission(String userPermission);

    boolean checkReadPermission(String userPermission);

    boolean checkUpdatePermission(String userPermission);

    boolean checkImportPermission(String userPermission);

    List<UserPermissionResponse> getAll();

    UserPermissionResponse updatePermission(UpdatePermissionRequest request);
}
