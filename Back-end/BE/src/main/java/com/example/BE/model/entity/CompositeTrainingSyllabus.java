package com.example.BE.model.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.io.Serializable;

@Embeddable
public class CompositeTrainingSyllabus implements Serializable {

    @ManyToOne
    @JoinColumn(name = "training_program_code")
    private TrainingProgram program;


    @ManyToOne
    @JoinColumn(name = "topic_code")
    private Syllabus program_topic;
}
