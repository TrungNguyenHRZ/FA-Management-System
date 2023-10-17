package com.example.BE.controller.user;


import com.example.BE.config.OpenApiConfig;
import com.example.BE.dto.request.userPermission.UpdatePermissionRequest;
import com.example.BE.dto.response.userPermission.UserPermissionResponse;
import com.example.BE.service.UserPermissionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-permission")
@RequiredArgsConstructor
public class UserPermissionController {

    private final UserPermissionService userPermissionService;


    @GetMapping(value = "/all")
    @SecurityRequirement(name = OpenApiConfig.SERCURITY_BEARER)
    public ResponseEntity<List<UserPermissionResponse>> getAllPermission() {
        List<UserPermissionResponse> response = userPermissionService.getAll();
        return ResponseEntity.ok(response);
    }


    @PutMapping(value = "/update")
    @SecurityRequirement(name = OpenApiConfig.SERCURITY_BEARER)
    public ResponseEntity<UserPermissionResponse> updatePermission(@Valid @RequestBody UpdatePermissionRequest request) {
        UserPermissionResponse response = userPermissionService.updatePermission(request);
        return ResponseEntity.ok(response);
    }

}
