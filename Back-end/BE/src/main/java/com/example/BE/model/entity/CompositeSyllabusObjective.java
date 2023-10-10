package com.example.BE.model.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class CompositeSyllabusObjective implements Serializable {
	
	@ManyToOne
	@JoinColumn(name="topic_code")
	private Syllabus syllabus_object_code;

	@ManyToOne
	@JoinColumn(name="learning_objective_code")
	private LearningObject learning_code;
}
