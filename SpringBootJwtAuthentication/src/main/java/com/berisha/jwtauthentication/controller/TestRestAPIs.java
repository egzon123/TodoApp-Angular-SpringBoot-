package com.berisha.jwtauthentication.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin( origins = "http://localhost:4200" )
public class TestRestAPIs {

    @GetMapping( "/api/test/user" )
    @PreAuthorize( "hasRole('USER') or hasRole('ADMIN')" )
    public Message userAccess() {
        return new Message("User content");
    }

    @GetMapping( "/api/test/pm" )
    @PreAuthorize( "hasRole('PM') or hasRole('ADMIN')" )
    public Message projectManagementAccess() {
        return new Message("Project manager content");
    }

    @GetMapping( "/api/test/admin" )
    @PreAuthorize( "hasRole('ADMIN')" )
    public Message adminAccess() {
        return new Message("Admin content");
    }
}