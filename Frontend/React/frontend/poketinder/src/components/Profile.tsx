import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Select from "react-select";

import "./Profile.css";

function Profile() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonOverall, setpokemonOverall] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [clickedPokemon, setclickedPokemon] = useState(false);
  const [clickedStats, setclickedStats] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [clickedvalue, setclickedvalue] = useState(false);

  const handleSelect = (event) => {
    setclickedvalue(true);
    setSelectedValue(event.target.textContent);
  };

  const handleClickPokemon = () => {
    setclickedPokemon(!clickedPokemon);
  };

  const handleStatsClick = () => {
    setclickedStats(!clickedStats);
  };

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );

        const pokemonsData = response.data.results;
        const pokemons = await Promise.all(
          pokemonsData.map(async (pokemon: any) => {
            const response = await axios.get(pokemon.url);
            return {
              id: response.data.id,
              name: response.data.name,
              imageUrl:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
                response.id +
                ".png",
              value: response.data.name,
              label:
                response.data.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            };
          })
        );
        setPokemonList(pokemons);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemonList();
  }, []);

  const handleSelectChange = async (option) => {
    console.log(option.id);
    setSelectedPokemon(option.id);
  };

  return (
    <div className="background_color_container">
      {clickedPokemon && (
        <div className="StoryPaper" style={{ position: "absolute" }}>
          <div className="Story">
            <textarea placeholder="Write down your story"></textarea>
          </div>
        </div>
      )}
      <div className="btn1">
        {clickedPokemon && (
          <Dropdown style={{ position: "absolute", color: "pink" }}>
            <Dropdown.Toggle className="btn1 glow-on-hover">
              Cards
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleSelect}>colorless</Dropdown.Item>
              <Dropdown.Item onClick={handleSelect}>dark</Dropdown.Item>
              <Dropdown.Item onClick={handleSelect}>dragon</Dropdown.Item>
              <Dropdown.Item onClick={handleSelect}>fairy</Dropdown.Item>
              <Dropdown.Item onClick={handleSelect}>fighting</Dropdown.Item>
              <Dropdown.Item onClick={handleSelect}>fire</Dropdown.Item>
              <Dropdown.Item onClick={handleSelect}>grass</Dropdown.Item>
              <Dropdown.Item onClick={handleSelect}>lightning</Dropdown.Item>
              <Dropdown.Item onClick={handleSelect}>metal</Dropdown.Item>
              <Dropdown.Item onClick={handleSelect}>psychic</Dropdown.Item>
              <Dropdown.Item onClick={handleSelect}>water</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
      <div className="btn2">
        {clickedPokemon && (
          <Select
            className="glow-on-hover"
            options={pokemonList}
            onChange={handleSelectChange}
            value={selectedPokemon}
          />
        )}
      </div>

      <div className="SelectedPokemon">
        {selectedPokemon &&
         <div className="PokemonImgSelected">
          <img style={{position:"absolute"}} src= {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon}.png`} alt="" />
          </div>}
      </div>

      {clickedvalue && (
        <div
          className="PokemonCard_Chosen"
          style={{
            position: "absolute",
          }}
        >
          <div
            className={`card${selectedValue}`}
            style={{
              width: "360px",
              height: "500px",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      )}

      <div className="PokeTinderLogo">
        <strong>PokéTinder</strong>
      </div>
      <div className="Left-Bar"></div>
      <button
        className="PokemonTab glow-on-hover"
        type="button"
        onClick={handleClickPokemon}
      >
        POKEMON
      </button>

      <button
        className="CardTab glow-on-hover"
        onClick={handleStatsClick}
        type="button"
      >
        STATS
      </button>

      <img
        className="pikachu-img"
        src="/src/components/profile/pikachu.webp"
      ></img>

      <img
        className="pokemonIcon-img"
        src="/src/components/profile/pokemonIcon.png"
      ></img>

      <button
        className="Save glow-on-hover"
        style={{ position: "absolute" }}
        type="button"
      >
        Save
      </button>
    </div>
  );
}

export default Profile;
