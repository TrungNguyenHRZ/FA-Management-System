package com.example.BE.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "Learning_Object")
@Data
public class LearningObject {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="learning_objective_code")
	private int learning_objective_code;

	@Column(name="learning_name")
	private String learning_name;

	@ManyToOne
	@JoinColumn(name="delivery_type")
	private TrainingContent delivery_type;

	@Column(name="learning_description")
	private String learning_description;

	@ManyToMany(fetch = FetchType.LAZY, cascade = {
			CascadeType.DETACH, CascadeType.MERGE,
			CascadeType.PERSIST, CascadeType.REFRESH
	})
	@JoinTable (
			name = "syllabus_object",
			joinColumns = {
					@JoinColumn(name = "learning_objective_code")
			},
			inverseJoinColumns = @JoinColumn(name = "topic_code")
	)
	private List<Syllabus> syllabusList;

}
