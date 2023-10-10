package com.example.BE.controller.user;

import com.example.BE.dto.request.user.CreateUserRequest;
import com.example.BE.dto.response.user.UserResponse;
import com.example.BE.handle.GlobalExceptionHandler;
import com.example.BE.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.BE.model.entity.User;
import com.example.BE.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.Objects;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

	private final UserRepository repo;
	private final UserService userService;


	@GetMapping(value="/view/{id}")
	public User getUserById(@PathVariable int id){
		return repo.getUserById(id);
	}


	@PostMapping("/create")
	public ResponseEntity<UserResponse> createUser(@RequestBody CreateUserRequest request) {
		UserResponse userResponse = userService.createUser(request);
		return ResponseEntity.ok(userResponse);
	}




	
	

}
