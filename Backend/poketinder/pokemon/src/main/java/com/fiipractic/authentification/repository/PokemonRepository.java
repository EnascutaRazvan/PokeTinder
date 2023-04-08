package com.fiipractic.authentification.repository;


import com.fiipractic.authentification.model.Pokemon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PokemonRepository extends JpaRepository<Pokemon,Integer> {

    List<Pokemon> findByName(@Param(value = "name") String name);
}
