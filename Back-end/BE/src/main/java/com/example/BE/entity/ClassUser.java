package com.example.BE.entity;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.example.BE.enums.Role;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "user_class")
@Data
public class ClassUser implements Serializable {

    @EmbeddedId
    private CompositeClassUser class_user_id;

	@Column(name="user_type")
	private Role userType;

}
