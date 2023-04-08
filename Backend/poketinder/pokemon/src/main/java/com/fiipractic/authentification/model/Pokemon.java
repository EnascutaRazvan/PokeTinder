package com.fiipractic.authentification.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString
public class Pokemon {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private List<String> abilities;
    private Double attack;
    private Integer baseEggSteps;
    private Integer baseHappiness;
    private Integer baseTotal;
    private Integer captureRate;
    private Double defense;
    private Integer experienceGrowth;
    private Double height;
    private Integer hp;
    private String name;
    private Double percentageMale;
    private Double spAttack;
    private Double spDefense;
    private Double speed;
    private String type1;
    private String type2;
    private Double weight;
    private Integer generation;
    private Boolean isLegendary;
    private String story;




}
