// package com.example.BE.controller.common;


// import com.example.BE.dto.request.user.CreateUserSARequest;
// import com.example.BE.dto.response.user.UserResponse;
// import com.example.BE.service.UserService;
// import io.swagger.v3.oas.annotations.Operation;
// import io.swagger.v3.oas.annotations.tags.Tag;
// import jakarta.validation.Valid;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// @RequestMapping("/dev")
// @RequiredArgsConstructor
// @Tag(name = "For Developer Controller")
// public class CommonController {

//     private final UserService userService;

//     @Operation(summary = "Api create user Super Admin")
//     @PostMapping("/user/admin")
//     ResponseEntity<UserResponse> createUserSA(@Valid @RequestBody CreateUserSARequest request) {
//         UserResponse response = userService.createUserSA(request);
//         return ResponseEntity.ok(response);
//     }

// }
