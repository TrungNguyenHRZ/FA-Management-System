package com.example.BE.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "Phone")
    private String phone;

    @Column(name = "password")
    private String password;

    @Temporal(TemporalType.DATE)
    @Column(name = "dob")
    private Date dob;

    @Column(name = "gender")
    private String gender;

    @Column(name = "status")
    private String status;

    @Column(name = "create_by")
    private LocalDateTime createBy;

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
}
