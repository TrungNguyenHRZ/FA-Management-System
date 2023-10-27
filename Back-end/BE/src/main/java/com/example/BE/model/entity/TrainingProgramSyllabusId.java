package com.example.BE.model.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class TrainingProgramSyllabusId implements Serializable {
    private static final long serialVersionUID = 1L;
    private int training_program_code;
    private int topic_code;
}
