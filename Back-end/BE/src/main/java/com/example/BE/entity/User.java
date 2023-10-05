package com.example.BE.entity;

import com.example.BE.enums.Gender;
import com.example.BE.enums.UserStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "password")
    private String password;

    @Temporal(TemporalType.DATE)
    @Column(name = "dob")
    private Date dob;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @Column(name = "create_by")
    private String createBy;

    @Temporal(TemporalType.DATE)
    @Column(name = "create_date")
    private Date createdDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "modified_date")
    private Date modifiedDate;

    @Column(name = "modified_by")
    private String modifiedBy;

    @ManyToOne
    @JoinColumn(name = "role")
    private UserPermission permission;

    // @OneToMany(mappedBy = "user")
    // private Set<ClassUser> userList = new HashSet<>();

    @OneToMany(mappedBy = "user_syllabus")
    Set<Syllabus> syllabusList = new HashSet<>();

    @OneToMany(mappedBy = "user_training")
    Set<TrainingProgram> trainingPrograms = new HashSet<>();

	@ManyToOne
	@JoinColumn(name = "class_user_id")
	private ClassUser classUser;

}
