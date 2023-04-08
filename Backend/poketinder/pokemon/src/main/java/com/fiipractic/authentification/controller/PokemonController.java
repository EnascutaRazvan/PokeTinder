package com.fiipractic.authentification.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fiipractic.authentification.model.Pokemon;
import com.fiipractic.authentification.repository.PokemonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController

public class PokemonController {
    private final PokemonRepository pokemonRepository;

    public PokemonController(PokemonRepository pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }


    @GetMapping(value = "/pokemon")
    public List<Pokemon> getPokemon() {
        return pokemonRepository.findAll();
    }

    @GetMapping(value = "/pokemon/{id}")
    public Pokemon getPokemon(@PathVariable(value = "id") Integer id) {
        Pokemon pokemon = pokemonRepository.findById(id).orElse(null);

        if(pokemon == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pokemon not found");
        }

        return pokemon;
    }
}

