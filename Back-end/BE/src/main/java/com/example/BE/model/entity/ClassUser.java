package com.example.BE.model.entity;



import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "UserClass")
@Data
public class ClassUser {

    @EmbeddedId
    private CompositeClassUser class_user_id;

	@Column(name="UserType")
	private String userType;

}
