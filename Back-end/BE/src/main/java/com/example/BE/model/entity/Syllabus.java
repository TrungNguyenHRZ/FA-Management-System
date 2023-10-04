package com.example.BE.model.entity;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
<<<<<<< Updated upstream
=======
import jakarta.persistence.JoinColumn;
>>>>>>> Stashed changes
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Table(name = "Syllabus")
@Data
public class Syllabus {
	
	@Id
	@Column(name="topic_code")
	private String topic_code;

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

	// @OneToMany(mappedBy="program_topic")
	// Set<TrainingProgramSyllabus> training_program = new HashSet<>();

	// @OneToMany(mappedBy="syllabus_object_code")
	// Set<SyllabusObject> syllabus_object = new HashSet<>();

	@ManyToOne
	@JoinColumn(name="userid")
	private User user_syllabus;

	@OneToMany(mappedBy="unit_topic_code")
	Set<TrainingUnit> syllabus_unit = new HashSet<>();
}
