package com.example.BE.model.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Learning_Object")
@Data
public class LearningObject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "learning_objective_code")
    private int code;

    @Column(name = "learning_name")
    private String learning_name;

    @Column(name = "type")
    private String type;

    @Column(name = "learning_description")
    private String learning_description;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private TrainingContent content_id;

    @OneToMany(mappedBy="learning_code")
    Set<SyllabusObject> learning_objects = new HashSet<>();
}
