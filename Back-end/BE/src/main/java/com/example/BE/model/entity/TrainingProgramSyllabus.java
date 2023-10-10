package com.example.BE.model.entity;

import jakarta.persistence.Column;
// import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

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
