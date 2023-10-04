package com.example.BE.entity;
import java.io.Serializable;

import jakarta.persistence.Column;
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
