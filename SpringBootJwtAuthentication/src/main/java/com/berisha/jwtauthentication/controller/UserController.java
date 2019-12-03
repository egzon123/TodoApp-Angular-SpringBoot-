package com.berisha.jwtauthentication.controller;

import com.berisha.jwtauthentication.message.request.ChangePassword;
import com.berisha.jwtauthentication.model.Role;
import com.berisha.jwtauthentication.model.RoleName;
import com.berisha.jwtauthentication.model.Todo;
import com.berisha.jwtauthentication.model.User;
import com.berisha.jwtauthentication.repository.RoleRepository;
import com.berisha.jwtauthentication.repository.UserRepository;
import com.google.gson.internal.$Gson$Preconditions;
import lombok.extern.slf4j.Slf4j;
import org.apache.log4j.Logger;
import org.omg.PortableServer.REQUEST_PROCESSING_POLICY_ID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @GetMapping("/users")
    public List<User> getAllTodosAdmin(){
        return userRepository.findAll();

    }


    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id){


        userRepository.deleteById(id);

        return ResponseEntity.noContent().build();

    }

    @PutMapping("/user/{userId}/updateUser")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable("userId") long id){
        User u = userRepository.findById(id).get();
        u = user;
        User updatedUser = userRepository.save(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable long id){
        return userRepository.findById(id).get();
    }

    @PutMapping("/users/{userId}/roles/{roleId}/updateRole")
    public ResponseEntity<User> updateRole(@PathVariable("userId") Long userId, @PathVariable("roleId") Long roleId){
        User user = userRepository.findById(userId).get();
        Role role = roleRepository.findById(roleId).get();
        user.addRole(role);
        User updatedUser = userRepository.saveAndFlush(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/users/{userId}/roles/{roleId}/deleteRole")
    public ResponseEntity<User> deleteRoleFromUser(@PathVariable("userId") Long userId, @PathVariable("roleId") Long roleId){
        User user = userRepository.findById(userId).get();
        Role role = roleRepository.findById(roleId).get();
        user.removeRole(role);
        User updatedUser = userRepository.saveAndFlush(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @PutMapping(value = "/user/{userId}/changePassword")
    public ResponseEntity<User> updateUserPassword(@PathVariable("userId") Long userId, @RequestBody ChangePassword changePassword){
        User user = userRepository.findById(userId).get();
        String encodedPassword = passwordEncoder.encode(changePassword.getNewPassword());
        user.setPassword(encodedPassword);
        User updatedUser = userRepository.save(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }


    @PostMapping("/users")
    public ResponseEntity<User> addUser(@RequestBody User user){
        Role role = new Role();
        long defaultRole = 1;
        role.setId(defaultRole);
        Role newRole = role;
        user.addRole(newRole);
        userRepository.save(user);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

}
