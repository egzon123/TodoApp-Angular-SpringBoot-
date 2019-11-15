package com.berisha.jwtauthentication.controller;

import com.berisha.jwtauthentication.model.Todo;
import com.berisha.jwtauthentication.model.User;
import com.berisha.jwtauthentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUserRole(
            @PathVariable long id, @RequestBody User user){

            User updatedUser = userRepository.save(user);
        return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
    }




}
