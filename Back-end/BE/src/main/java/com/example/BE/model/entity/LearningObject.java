package com.example.BE.model.entity;

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

    @ManyToOne
    @JoinColumn(name = "delivery_type")
    private TrainingContent delivery_type;

    @Column(name = "learning_description")
    private String learning_description;

    // @OneToMany(mappedBy="learning_code")
    // Set<SyllabusObject> learning_objects = new HashSet<>();
}
