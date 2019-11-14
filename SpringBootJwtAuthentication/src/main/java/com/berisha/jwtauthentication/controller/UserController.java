package com.berisha.jwtauthentication.controller;

import com.berisha.jwtauthentication.model.Todo;
import com.berisha.jwtauthentication.model.User;
import com.berisha.jwtauthentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/users")
    public List<User> getAllTodosAdmin(){
        return userRepository.findAll();

    }


    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id){


        userRepository.deleteById(id);

        return ResponseEntity.noContent().build();

    }


}
