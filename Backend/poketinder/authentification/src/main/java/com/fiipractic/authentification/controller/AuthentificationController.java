package com.fiipractic.authentification.controller;


import com.fiipractic.user.model.User;
import com.fiipractic.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class AuthentificationController {


    UserRepository userRepository;

    public AuthentificationController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthentificationController() {
    }




}
