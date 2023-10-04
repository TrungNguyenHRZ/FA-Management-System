package com.example.BE.entity;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Learning_Object")
@Data
public class LearningObject {
	
	@Id
	@Column(name="learning_objective_code")
	private String code;

	@Column(name="learning_name")
	private String learning_name;

	@ManyToOne
	@JoinColumn(name="delivery_type")
	private TrainingContent delivery_type;

	@Column(name="learning_description")
	private String learning_description;

	// @OneToMany(mappedBy="learning_code")
	// Set<SyllabusObject> learning_objects = new HashSet<>();
}
