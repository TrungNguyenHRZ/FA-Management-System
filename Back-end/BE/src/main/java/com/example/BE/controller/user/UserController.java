package com.example.BE.controller.user;

import com.example.BE.dto.request.user.CreateUserRequest;
import com.example.BE.dto.request.user.GantPermissionUserRequest;
import com.example.BE.dto.request.user.GetAllRequest;
import com.example.BE.dto.request.user.UpdateUserRequest;
import com.example.BE.dto.response.user.UserPageResponse;
import com.example.BE.dto.response.user.UserResponse;
import com.example.BE.handle.GlobalExceptionHandler;
import com.example.BE.service.UserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.BE.model.entity.User;
import com.example.BE.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Objects;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

	private final UserRepository repo;
	private final UserService userService;


	@GetMapping(value="/view/{id}")
	public User getUserById(@PathVariable(name = "id") int id){
		return repo.getUserById(id);
	}


	@PostMapping("/create")
	public ResponseEntity<UserResponse> createUser(@RequestBody CreateUserRequest request) {
		UserResponse userResponse = userService.createUser(request);
		return ResponseEntity.ok(userResponse);
	}


	@GetMapping("/all")
	public ResponseEntity<UserPageResponse> getAllUser(@ParameterObject GetAllRequest request){
		UserPageResponse response = userService.getAllUser(request);
		return ResponseEntity.ok(response);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<UserResponse> updateUSer(@PathVariable(name = "id") int id, UpdateUserRequest request){
		request.setId(id);
		UserResponse userResponse = userService.updateInfoUser(request);
		return ResponseEntity.ok(userResponse);
	}


	@GetMapping(value="/{id}")
	public ResponseEntity<UserResponse> getUser2ById(@PathVariable int id){
		UserResponse userResponse = userService.getUserById(id);
		return ResponseEntity.ok(userResponse);
	}

	@PutMapping(value = "/gant-permission/{id}")
	public ResponseEntity<UserResponse> changePermission(@PathVariable(name = "id") int id, @RequestBody GantPermissionUserRequest request){
		request.setId(id);
		UserResponse userResponse = userService.gantPermissionUser(request);
		return ResponseEntity.ok(userResponse);
	}

}
