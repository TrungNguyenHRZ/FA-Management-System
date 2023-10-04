package com.example.BE.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

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
