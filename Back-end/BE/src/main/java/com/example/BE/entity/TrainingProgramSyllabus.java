package com.example.BE.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Training_Program_Syllabus")
@Data
public class TrainingProgramSyllabus {

	@EmbeddedId
	private CompositeTrainingSyllabus training_syllabus_id;

	@Column
	private String sequence;
}
