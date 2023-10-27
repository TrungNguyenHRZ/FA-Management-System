package com.example.BE.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Syllabus_Object")
@Data
public class SyllabusObject implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

     @ManyToOne
    @JoinColumn(name = "topic_code")
    private Syllabus syllabus_object_code;

    @ManyToOne
    @JoinColumn(name = "learning_objective_code")
    private LearningObject learning_code;


}
