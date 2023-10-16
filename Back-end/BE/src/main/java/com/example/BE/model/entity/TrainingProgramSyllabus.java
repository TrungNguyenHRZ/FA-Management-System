package com.example.BE.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Training_Program_Syllabus")
@Data
public class TrainingProgramSyllabus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "training_program_code")
    private TrainingProgram program;


    @ManyToOne
    @JoinColumn(name = "topic_code")
    private Syllabus program_topic;

    @Column
    private String sequence;
}
