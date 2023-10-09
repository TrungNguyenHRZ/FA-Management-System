package com.example.BE.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "class_user")
@Data
public class ClassUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "classID")
    private Class classEntity;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @Column(name = "UserType")
    private String userType;
}
