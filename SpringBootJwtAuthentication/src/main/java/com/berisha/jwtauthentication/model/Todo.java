package com.berisha.jwtauthentication.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

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

	@OneToMany(mappedBy = "todo")
	private Set<Label> labels;
	
	


	
}