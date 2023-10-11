package com.example.BE.model.entity;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;
// import java.util.UUID;

@Entity
@Table(name = "Training_Content")
@Data
public class TrainingContent {

	@Id
	@GeneratedValue(generator = "uuid2")
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	@Column(name = "content_id")
	private String contentId;

	@Column(name = "content")
	private String content;

	@Column(name="learning_objective")
	private String learningObjective;

	@Column(name="delivery_type")
	private String deliveryType;

	@Column(name = "Duration")
	private int duration;

	@Column(name="Training_Format")
	private String trainingFormat;

	@Column(name="note")
	private String note;

	@ManyToOne
	@JoinColumn(name="unit_code")
	private TrainingUnit unitCode;

	@OneToMany(mappedBy = "delivery_type")
	List<LearningObject> learning_objects;

}
