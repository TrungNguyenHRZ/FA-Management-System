package com.example.BE.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "UserPermission")
public class UserPermission {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PermissionID")
	public int permissionID;

	@Column(name="Training_Program")
	public String trainingProgram;

	@Column(name="Syllabus")
	public String syllabus;

	@Column(name="Learning_Material")
	public String material;

	@Column(name="UserManagement")
	public String user_management;

	@Column(name="Role")
	public String role;

	@Column(name="Class")
	private String class_name;

	@OneToMany(mappedBy = "permission")
	private Set<User> userList = new HashSet<>();

}
