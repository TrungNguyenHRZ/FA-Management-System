package com.example.BE.controller.user;

import com.example.BE.config.OpenApiConfig;
import com.example.BE.dto.request.user.*;
import com.example.BE.dto.response.user.LoginResponse;
import com.example.BE.dto.response.user.UserPageResponse;
import com.example.BE.dto.response.user.UserResponse;
import com.example.BE.model.entity.User;
import com.example.BE.repository.UserRepository;
import com.example.BE.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository repo;
    private final UserService userService;

    @Operation(summary = "Dang nhap")
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }


    @GetMapping(value = "/view/{id}")
    public User getUserById(@PathVariable(name = "id") int id) {
        return repo.getUserById(id);
    }


    @PostMapping("/create")
    @SecurityRequirement(name = OpenApiConfig.SERCURITY_BEARER)
    public ResponseEntity<UserResponse> createUser(@RequestBody CreateUserRequest request) {
        UserResponse userResponse = userService.createUser(request);
        return ResponseEntity.ok(userResponse);
    }


    @GetMapping("/all")
    @SecurityRequirement(name = OpenApiConfig.SERCURITY_BEARER)
    public ResponseEntity<UserPageResponse> getAllUser(@ParameterObject GetAllRequest request) {
        UserPageResponse response = userService.getAllUser(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    @SecurityRequirement(name = OpenApiConfig.SERCURITY_BEARER)
    public ResponseEntity<UserResponse> updateUSer(@PathVariable(name = "id") int id, UpdateUserRequest request) {
        request.setId(id);
        UserResponse userResponse = userService.updateInfoUser(request);
        return ResponseEntity.ok(userResponse);
    }


    @GetMapping(value = "/info")
    @SecurityRequirement(name = OpenApiConfig.SERCURITY_BEARER)
    public ResponseEntity<UserResponse> getUser2ById() {
        UserResponse userResponse = userService.getUserInfo();
        return ResponseEntity.ok(userResponse);
    }


    @GetMapping(value = "/info/{id}")
    @SecurityRequirement(name = OpenApiConfig.SERCURITY_BEARER)
    public ResponseEntity<UserResponse> getUser2ById(@PathVariable(name = "id") int id) {
        UserResponse userResponse = userService.getUserById(id);
        return ResponseEntity.ok(userResponse);
    }

    @PutMapping(value = "/gant-permission/{id}")
    @SecurityRequirement(name = OpenApiConfig.SERCURITY_BEARER)
    public ResponseEntity<UserResponse> changePermission(@PathVariable(name = "id") int id, @RequestBody GantPermissionUserRequest request) {
        request.setId(id);
        UserResponse userResponse = userService.gantPermissionUser(request);
        return ResponseEntity.ok(userResponse);
    }

    @PutMapping(value = "/changePass/{id}")
    @SecurityRequirement(name = OpenApiConfig.SERCURITY_BEARER)
    public ResponseEntity<UserResponse> changePass(@PathVariable(name = "id") int id, @RequestBody ChangePasswordRequest request) {
        request.setId(id);
        UserResponse userResponse = userService.changePass(request);
        return ResponseEntity.ok(userResponse);
    }



    @PostMapping("/create-sp-admin")
    public ResponseEntity<UserResponse> createSupperAdmin(@RequestBody CreateUserSARequest request) {
        UserResponse userResponse = userService.createUserSA(request);
        return ResponseEntity.ok(userResponse);
    }
}
