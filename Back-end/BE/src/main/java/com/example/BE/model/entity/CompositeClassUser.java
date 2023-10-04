package com.example.BE.model.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class CompositeClassUser {
	
	@ManyToOne
    @JoinColumn(name = "userid")
    private User user;

    
	@ManyToOne
    @JoinColumn(name = "classid")
    private Class class_object;
}
