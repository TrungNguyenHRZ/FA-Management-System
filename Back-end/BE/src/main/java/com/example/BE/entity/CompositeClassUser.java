package com.example.BE.entity;
import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class CompositeClassUser implements Serializable{
	
	@ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    
	@ManyToOne
    @JoinColumn(name = "class_id", referencedColumnName = "id")
    private Class classObject;
}
