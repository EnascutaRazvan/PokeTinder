package com.fiipractic.controller;


import com.fiipractic.model.Pokemon;
import com.fiipractic.service.WhosThatPokemonService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Objects;

@Controller
public class WhosThatPokemonController {

    private final WhosThatPokemonService whosThatPokemonService;

    public WhosThatPokemonController(WhosThatPokemonService whosThatPokemonService) {
        this.whosThatPokemonService = whosThatPokemonService;
    }


    @GetMapping(value = "/")
    public String whosThatPokemon(Model model) {
        Pokemon pokemon = whosThatPokemonService.getRandomPokemon();
        model.addAttribute("pokemonIndex", pokemon.getId());
        return "whos-that-pokemon";
    }

    @PostMapping(value = "/guess")
    public String guess(@RequestParam String guess, @RequestParam Integer pokemonIndex, Model model) {
        Pokemon pokemon = whosThatPokemonService.getPokemonById(pokemonIndex);
        String result;
        if (guess.equalsIgnoreCase(pokemon.getName())) {
            result = "Correct!";
        } else {
            result = "Incorrect! Correct answer is " + pokemon.getName();
        }
        model.addAttribute("pokemonIndex", pokemon.getId());
        model.addAttribute("result", result);

        return "whos-that-pokemon";
    }
}
