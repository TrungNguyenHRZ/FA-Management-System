package com.example.BE.model.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "UserPermission")
public class UserPermission {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "permission_id")
	public int permissionId;

	@Column(name="role")
	public String role;

	@Column(name="training_program")
	public String trainingProgram;

	@Column(name="syllabus")
	public String syllabus;

	@Column(name="learning_material")
	public String material;

	@Column(name="user_anagement")
	public String userManagement;



	@Column(name="class_name")
	private String className;

	@OneToMany(mappedBy = "permission")
	private Set<User> userList = new HashSet<>();

}
