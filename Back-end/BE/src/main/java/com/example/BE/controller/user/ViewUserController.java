package com.example.BE.controller.user;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BE.model.entity.User;
import com.example.BE.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/user")
public class ViewUserController {
	
	@Autowired
	UserRepository repo;

	@GetMapping(value="/view/{id}")
	public User getUserById(@PathVariable int id){
		return repo.getUserById(id);
	}
	
	
	

}
