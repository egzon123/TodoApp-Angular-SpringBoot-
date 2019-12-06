package com.berisha.jwtauthentication.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
public class Todo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String username;
	private String description;
	private Date targetDate;
	private boolean isDone;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

//	@JsonBackReference
	@JsonManagedReference
	@OneToMany(mappedBy = "todo",fetch = FetchType.EAGER)
	private List<Label> labels;
	

	public String toString(){
		return this.description;
	}

	public void addlabel(Label label){
		labels.add(label);
	}

	public void removeLabel(Label label){
		labels.remove(label);
	}
	
}