package com.berisha.jwtauthentication.controller;

import com.berisha.jwtauthentication.model.Todo;
import com.berisha.jwtauthentication.repository.LabelRepository;
import com.berisha.jwtauthentication.repository.TodoJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api")
public class LabelController {

    @Autowired
    private LabelRepository labelRepository;

    @Autowired
    private TodoJpaRepository todoJpaRepository;


}
