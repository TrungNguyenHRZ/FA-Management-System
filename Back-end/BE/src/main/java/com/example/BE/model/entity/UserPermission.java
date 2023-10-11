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
    public String role;
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "permission_id")
    public int permissionId;

    

    @Column(name = "training_program")
    public String trainingProgram;

    @Column(name = "syllabus")
    public String syllabus;

    @Column(name = "learning_material")
    public String material;

    @Column(name = "user_anagement")
    public String userManagement;


    @Column(name = "class_name")
    private String className;

    @OneToMany(mappedBy = "permission", cascade = CascadeType.ALL)
    private Set<User> userList = new HashSet<>();

}
