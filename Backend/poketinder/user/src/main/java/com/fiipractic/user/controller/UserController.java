package com.fiipractic.user.controller;

import com.fiipractic.authentification.model.Pokemon;
import com.fiipractic.user.model.User;
import com.fiipractic.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserController() {
    }


    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User tempUser = userRepository.findByEmail(user.getEmail()).orElse(null);
        if (tempUser != null && tempUser.getPassword().equals(user.getPassword())) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(200), "User logged in!");
        }
        else {
            throw new ResponseStatusException(HttpStatusCode.valueOf(401), "Wrong credentials!");
        }
    }
    @PostMapping("/loginUser")
    public Integer loginUser(@RequestBody User user)
    {
        return userRepository.findByEmail(user.getEmail()).orElse(null).getId();
    }

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists!");
        }
        else {
            userRepository.save(user);
            return "User created!";
        }
    }

    @PostMapping("/updateUser")
    public void updateUser(@RequestBody User user) {
        userRepository.save(user);
    }

    @PostMapping("/updateLikedPokemons")
    public void updateLikedPokemons(@RequestBody User user) {
        User tempUser = userRepository.findById(user.getId()).orElse(null);
        System.out.println(user);
        if (tempUser != null) {
            tempUser.setLikedPokemons(user.getLikedPokemons());
            userRepository.save(tempUser);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!");

    }

    }
}
