package com.example.BE.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Syllabus")
@Data
public class Syllabus {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="topic_code")
	private int topic_code;

	@Column(name="topic_name")
	private String topic_name;

	@Column(name="technical_group")
	private String technical_group;

	@Column(name="version")
	private String version;

	@Column(name="training_audience")
	private String training_audience;

	@Column(name="topic_outline")
	private String topic_outline;

	@Column(name="training_materials")
	private String training_materials;

	@Column(name="training_principles")
	private String training_principles;

	@Column(name="priority")
	private String priority;

	@Column(name="publish_status")
	private String publish_status;

	@Column(name = "Create_By")
	private String create_by;

	@Temporal(TemporalType.DATE)
	@Column(name = "Create_Date")
	private Date createdDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "Modified_Date")
	private Date modified_date;

	@Column(name = "Modified_By")
	private String modified_by;
	@Column(name = "Level")
	private String level;

	// @OneToMany(mappedBy="program_topic")
	// Set<TrainingProgramSyllabus> training_program = new HashSet<>();

	// @OneToMany(mappedBy="syllabus_object_code")
	// Set<SyllabusObject> syllabus_object = new HashSet<>();

	@ManyToOne
	@JoinColumn(name="userid")
	private User user_syllabus;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			name = "Training_Program_Syllabus",
			joinColumns = {
					@JoinColumn(name = "topic_code")
			}, inverseJoinColumns = @JoinColumn(name = "training_code")
	)
	List<TrainingProgram> trainingProgramList;

	@ManyToMany(fetch = FetchType.LAZY, cascade = {
			CascadeType.DETACH, CascadeType.MERGE,
			CascadeType.PERSIST, CascadeType.REFRESH
	})
	@JoinTable (
			name = "syllabus_object",
			joinColumns = {
					@JoinColumn(name = "topic_code")
			},
			inverseJoinColumns = @JoinColumn(name = "learning_objective_code")
	)
	private List<LearningObject> learningObjects;
}
