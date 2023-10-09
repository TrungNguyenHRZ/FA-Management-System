package com.example.BE.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Training_Content")
@Data
public class TrainingContent {

	@Id
	@Column(name = "content")
	private String content;

	@Column(name="learning_objective")
	private String learningObjective;

	@Column(name="delivery_type")
	private String deliveryType;

	@Temporal(TemporalType.TIME)
	@Column(name = "Duration")
	public Date duration;

	@Column(name="Training_Format")
	private String trainingFormat;

	@Column(name="note")
	private String note;

	@ManyToOne
	@JoinColumn(name="unit_code")
	private TrainingUnit unitCode;

	@OneToMany(mappedBy = "delivery_type")
	Set<LearningObject> learning_objects = new HashSet<>();

}
