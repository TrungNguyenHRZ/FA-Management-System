package com.example.BE.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "UserPermission")
public class UserPermission {

    @Id
    @Column(name = "role")
    private String role;
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "permission_id")
    private int permissionId;

    @Column(name = "training_program")
    private String trainingProgram;

    @Column(name = "syllabus")
    private String syllabus;

    @Column(name = "learning_material")
    private String material;

    @Column(name = "user_anagement")
    private String userManagement;


    @Column(name = "class_name")
    private String className;

    @OneToMany(mappedBy = "permission", cascade = CascadeType.ALL)
    private Set<User> userList = new HashSet<>();

}
