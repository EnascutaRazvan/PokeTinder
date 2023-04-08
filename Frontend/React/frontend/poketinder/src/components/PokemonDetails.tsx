import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./PokemonDetails.css";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  type1: string;
  type2: string;
  attack: number;
  base_egg_steps: number;
  base_happiness: number;
  base_total: number;
  capture_rate: number;
  defense: number;
  speed: number;
  story: string;
}

function PokemonDetails() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("id")){
      navigate("/login");
      localStorage.clear();
    }
     
  }, [localStorage.getItem("id")]);

  useEffect(() => {
    async function fetchPokemon() {
      const response = await axios.get(`http://localhost:8081/pokemon/${id}`);
      const data = response.data;
      console.log(response.data);
      const pokemon = {
        id: data.id,
        name: data.name,
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
          id +
          ".png",
        height: data.height,
        weight: data.weight,
        type1: data.type1,
        type2: data.type2,
        attack: data.attack,
        base_egg_steps: data.baseEggSteps,
        base_happiness: data.baseHappiness,
        base_total: data.baseTotal,
        capture_rate: data.captureRate,
        defense: data.defense,
        speed: data.speed,
        story: data.story,
      };
      setPokemon(pokemon);
    }

    fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="PokemonDetails-Container">
      <nav className="navBar">
        <h1 className="navbar_title">PokéTinder</h1>
      </nav>
      <div className={`PokemonDetails type${pokemon.type1}PokemonDetails`}>
        <div className="title-img-card">
          <h1>{pokemon.name}</h1>
          <div className="pokemon-types">
            <span className={`pokemon-types type${pokemon.type1}`}></span>
          </div>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="pokemon_img_cont"
          />
        </div>
        <div className="Bio">
          <strong className="BIO">Bio</strong>
          <p>Story: {pokemon.story}</p>
          <p>
            Height: <strong>{pokemon.height}</strong>
          </p>
          <p>
            Weight: <strong>{pokemon.weight}</strong>
          </p>
        </div>
        <div className="Stats">
          <strong className="STATS">Stats</strong>
          <p>
            Attack: <strong>{pokemon.attack}</strong>
          </p>
          <p>
            Capture Rate: <strong>{pokemon.capture_rate}</strong>
          </p>
          <p>
            Defense: <strong>{pokemon.defense}</strong>
          </p>
          <p>
            Speed: <strong>{pokemon.speed}</strong>
          </p>
        </div>

        <div className="Training">
          <strong className="TRAINING">Training</strong>
          <p>
            Base Egg Steps: <strong>{pokemon.base_egg_steps}</strong>
          </p>
          <p>
            Base Happiness: <strong>{pokemon.base_happiness}</strong>
          </p>
          <p>
            Base Total: <strong>{pokemon.base_total}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
