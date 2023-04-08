package com.fiipractic.user.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString
@Table(name = "\"user\"")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;


    private String email;
    private String password;

    private List<String> abilities;
    private List<Integer> likedPokemons;
    private Double attack;
    private Integer baseEggSteps;
    private Integer baseHappiness;
    private Integer baseTotal;
    private Integer captureRate;
    private Double defense;
    private Integer experienceGrowth;
    private Double height;
    private String name;
    private Double speed;
    private String type1;
    private Double weight;


}
