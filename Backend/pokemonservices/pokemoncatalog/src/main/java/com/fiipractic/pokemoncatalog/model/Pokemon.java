package com.fiipractic.pokemoncatalog.model;

public class Pokemon {

    private Integer id;
    private String name;
    private Integer baseTotal;
    private Integer baseEggSteps;

    public Integer getBaseEggSteps() {
        return baseEggSteps;
    }

    public void setBaseEggSteps(Integer baseEggSteps) {
        this.baseEggSteps = baseEggSteps;
    }

    public Pokemon(Integer id, String name, Integer baseTotal, Integer baseEggSteps) {
        this.id = id;
        this.name = name;
        this.baseTotal = baseTotal;
        this.baseEggSteps = baseEggSteps;
    }


    public Pokemon() {
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "Pokemon{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", baseTotal=" + baseTotal +
                ", baseEggSteps=" + baseEggSteps +
                '}';
    }

    public Integer getBaseTotal() {
        return baseTotal;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBaseTotal(Integer baseTotal) {
        this.baseTotal = baseTotal;
    }

}
