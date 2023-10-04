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
@Table(name = "Training_Unit")
@Data
public class TrainingUnit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="unit_code")
	private int unit_code;

	@Column(name="unit_name")
	private String unit_name;

	@Column(name="day_number")
	private int day_number;

	@ManyToOne
	@JoinColumn(name="topic_code")
	private Syllabus  unit_topic_code;

	@OneToMany(mappedBy="unitCode")
	Set<TrainingContent> training_content = new HashSet<>();
}
