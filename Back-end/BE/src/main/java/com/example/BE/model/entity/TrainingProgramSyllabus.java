package com.example.BE.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Training_Program_Syllabus")
@Data
@Setter
@Getter
public class TrainingProgramSyllabus {

    @EmbeddedId
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "Id")
    private TrainingProgramSyllabusId id;

    @ManyToOne
    @MapsId(value = "training_program_code")
    @JoinColumn(name = "training_program_code")
    private TrainingProgram program;


    @ManyToOne
    @MapsId(value = "topic_code")
    @JoinColumn(name = "topic_code", updatable = true)
    private Syllabus program_topic;

    @Column
    private String sequence;
}
