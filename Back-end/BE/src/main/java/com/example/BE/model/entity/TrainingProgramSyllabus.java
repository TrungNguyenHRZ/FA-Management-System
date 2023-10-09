package com.example.BE.model.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Training_Program_Syllabus")
@Data
public class TrainingProgramSyllabus {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "topic_code")
	private Syllabus syllabus;

	@ManyToOne
	@JoinColumn(name = "training_code")
	private TrainingProgram trainingProgram;

	@Column
	private String sequence;
}
