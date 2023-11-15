package com.example.BE.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.apache.batik.anim.dom.TraitInformation;

@Entity
@Table(name = "Training_Program_Syllabus")
@Data
@Setter
@Getter
public class TrainingProgramSyllabus {

    @EmbeddedId
    private TrainingProgramSyllabusId id;

    @ManyToOne
    @MapsId(value = "training_program_code")
    @JoinColumn(name = "training_program_code")
    @JsonIgnore
    private TrainingProgram program;


    @ManyToOne
    @MapsId(value = "topic_code")
    @JoinColumn(name = "topic_code", updatable = true)
    @JsonIgnore
    private Syllabus program_topic;

    @Column
    private String sequence;

    public TrainingProgramSyllabus(){

    }

    public TrainingProgramSyllabus(int training_program_code, int topic_code, String sequence){
        this.setId(new TrainingProgramSyllabusId(training_program_code, topic_code));
        this.sequence = sequence;
    }
}
