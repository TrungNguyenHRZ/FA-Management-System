package com.example.BE.service;

import com.example.BE.dto.request.user.*;
import com.example.BE.dto.response.user.LoginResponse;
import com.example.BE.dto.response.user.UserPageResponse;
import com.example.BE.dto.response.user.UserResponse;

public interface UserService {

    UserResponse createUser(CreateUserRequest request);

    UserPageResponse getAllUser(GetAllRequest request);

    UserResponse getUserInfo();
    UserResponse updateInfoUser(UpdateUserRequest request);
    UserResponse gantPermissionUser(GantPermissionUserRequest request);


    LoginResponse login(LoginRequest request);

    UserResponse createUserSA(CreateUserSARequest request);
}
