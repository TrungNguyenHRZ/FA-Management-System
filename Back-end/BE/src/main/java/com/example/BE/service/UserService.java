package com.example.BE.service;

import com.example.BE.dto.request.user.CreateUserRequest;
import com.example.BE.dto.response.user.UserResponse;

public interface UserService {

    UserResponse createUser(CreateUserRequest request);
}
