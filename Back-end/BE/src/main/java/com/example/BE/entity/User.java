package com.example.BE.entity;

import java.util.Date;
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
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Table(name = "Users")
@Data
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private int userID; 

	@Column(name = "Email")
	private String email;

	@Column(name = "Name")
	private String name;

	@Column(name = "Phone")
	private String phone;

	@Column(name = "Password")
	private String password;

	@Temporal(TemporalType.DATE)
	@Column(name = "DOB")
	private Date dob;

	@Column(name = "Gender")
	private String gender;

	@Column(name = "status")
	private String status;

	@Column(name = "Create_By")
	private String create_by;

	@Temporal(TemporalType.DATE)
	@Column(name = "Create_Date")
	private Date createdDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "Modified_Date")
	private Date modified_date;

	@Column(name = "Modified_By")
	private String modified_by;

	@ManyToOne
    @JoinColumn(name = "role")
    private UserPermission permission;

	// @OneToMany(mappedBy = "user")
    // private Set<ClassUser> userList = new HashSet<>();

	@OneToMany(mappedBy ="user_training")
	Set<TrainingProgram> trainingPrograms = new HashSet<>();
	
}
