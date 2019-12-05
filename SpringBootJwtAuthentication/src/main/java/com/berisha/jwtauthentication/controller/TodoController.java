package com.berisha.jwtauthentication.controller;

import com.berisha.jwtauthentication.model.Label;
import com.berisha.jwtauthentication.model.Todo;
import com.berisha.jwtauthentication.model.User;
import com.berisha.jwtauthentication.repository.LabelRepository;
import com.berisha.jwtauthentication.repository.TodoJpaRepository;
import com.berisha.jwtauthentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api")
public class TodoController {
	


	@Autowired
	private TodoJpaRepository todoJpaRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private LabelRepository labelRepository;

	@GetMapping("/users/todos")
	public List<Todo> getAllTodosAdmin(){
		return todoJpaRepository.findAll();
		//return todoService.findAll();
	}

	
	@GetMapping("/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username){
		return todoJpaRepository.findByUsername(username);
		//return todoService.findAll();
	}

	@GetMapping("/users/{username}/todos/{id}")
	public Todo getTodo(@PathVariable String username, @PathVariable long id){
		Todo todo= todoJpaRepository.findById(id).get();
		System.out.println("->>>>>>>>>>>>"+todo.toString());
		return todo;
		//return todoService.findById(id);
	}

	//DELETE /users/{username}/todos/{id}
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(
            @PathVariable String username, @PathVariable long id){
		
		//Todo todo = todoService.deleteById(id);
		todoJpaRepository.deleteById(id);
		
		return ResponseEntity.noContent().build();
		//return ResponseEntity.notFound().build();
	}
	

	//Edit/Update a Todo
	//PUT /users/{user_name}/todos/{todo_id}
	@PutMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(
            @PathVariable String username,
            @PathVariable long id, @RequestBody Todo todo){
		
		//Todo todoUpdated = todoService.save(todo);
		Todo todoUpdated = todoJpaRepository.save(todo);
		
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
	}
	
	@PostMapping("/users/{username}/todos")
	public ResponseEntity<Void> createTodo(
            @PathVariable String username, @RequestBody Todo todo){
		User user= null;
		System.out.println("Inside Todo controller :>>> "+todo);
//		System.out.println("labels ----> "+todo.getLabels().toString());
		for(User u :userRepository.findAll()){

		    if(u.getUsername().equalsIgnoreCase(username)){
		        user = u;
            }
        }


		//Todo createdTodo = todoService.save(todo);
		todo.setUsername(username);
		todo.setUser(user);
		Todo createdTodo = todoJpaRepository.save(todo);
		if(todo.getLabels() != null){
			for(Label label :todo.getLabels()){
				label.setId(0);
				label.setTodo(createdTodo);
				labelRepository.save(label);
			}

		}
		//Location
		//Get current resource url
		///{id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(createdTodo.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
		
}
