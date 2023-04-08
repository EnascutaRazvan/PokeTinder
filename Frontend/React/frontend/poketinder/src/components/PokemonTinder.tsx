import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import axios from "axios";
import { vec3 } from "gl-matrix";
import "./PokemonTinder.css";
import NavBar from "./NavBar";
import { Link, json, useNavigate } from "react-router-dom";
import { TupleSchema } from "yup";

interface IPokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
}

const PokemonTinder = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<IPokemon>();
  const [isSwiping, setIsSwiping] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [likedPokemons, setLikedPokemons] = useState<IPokemon[]>([]);
  const [dislikedPokemons, setDislikedPokemons] = useState<IPokemon[]>([]);

  const navigate = useNavigate();
  const x = useMotionValue(0);

  const interpolateColors = (color1: any, color2: any, ratio: any) => {
    const c1 = vec3.fromValues(color1[0], color1[1], color1[2]);
    const c2 = vec3.fromValues(color2[0], color2[1], color2[2]);

    const result = vec3.create();
    vec3.lerp(result, c1, c2, ratio);

    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
  };

  const generateGradient = (
    startColor1: any,
    startColor2: any,
    endColor1: any,
    endColor2: any,
    ratio: any
  ) => {
    const interpolatedStartColor = interpolateColors(
      startColor1,
      startColor2,
      ratio
    );
    const interpolatedEndColor = interpolateColors(endColor1, endColor2, ratio);
    return `linear-gradient(180deg, ${interpolatedStartColor} 0%, ${interpolatedEndColor} 100%)`;
  };

  const xRatio = useTransform(x, [-300, 300], [0, 1]);

  const startColors = [
    [255, 0, 140], // #ff008c
    [102, 255, 0], // #66ff00
    [130, 146, 51], // #829233
  ];

  const endColors = [
    [211, 9, 225], // rgb(211, 9, 225)
    [168, 0, 119], // #a80077
    [3, 209, 0], // rgb(3, 209, 0)
  ];

  const background = useTransform(xRatio, (ratio) => {
    const startColor1 = startColors[0];
    const startColor2 = startColors[2];
    const endColor1 = endColors[0];
    const endColor2 = endColors[2];

    return generateGradient(
      startColor1,
      startColor2,
      endColor1,
      endColor2,
      ratio
    );
  });

  window.addEventListener("beforeunload", function () {
    this.localStorage.removeItem("pokemon");
    this.localStorage.removeItem("pokemons");
    this.localStorage.clear();
  });

  useEffect(() => {
    if (!localStorage.getItem("id")) navigate("/login");
    else {
      const fetchPokemons = async () => {
        try {
          if (localStorage.getItem("pokemon") === null) {
            const response = await axios.get(
              "https://pokeapi.co/api/v2/pokemon?limit=151"
            );

            const pokemonsData = response.data.results;
            const pokemons = await Promise.all(
              pokemonsData.map(async (pokemon: any) => {
                const response = await axios.get(pokemon.url);
                const pokemonData = response.data;
                return {
                  id: pokemonData.id,
                  name: pokemonData.name,
                  imageUrl:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
                    pokemonData.id +
                    ".png",
                  types: pokemonData.types.map((type: any) => type.type.name),
                };
              })
            );
            setPokemons(pokemons);

            setCurrentPokemon(pokemons[0]);
            localStorage.setItem("pokemons", JSON.stringify(pokemons));
            localStorage.setItem("pokemon", JSON.stringify(currentPokemon));
          } else {
            console.log(JSON.parse(localStorage.getItem("pokemons")!));
            setPokemons(JSON.parse(localStorage.getItem("pokemons")!));
            setCurrentPokemon(JSON.parse(localStorage.getItem("pokemon")!));
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchPokemons();
    }
  }, [localStorage.getItem("id")]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const cacat = JSON.stringify({
          likedpokemons: likedPokemons.map((pokemon) => pokemon.id),
          id: localStorage.getItem("id"),
        });
        console.log(cacat);
        const response = await axios.post(
          "http://localhost:8092/updateLikedPokemons",
          JSON.stringify({
            likedPokemons: likedPokemons.map((pokemon) => pokemon.id),
            id: localStorage.getItem("id"),
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemonList();
  }, [likedPokemons]);

  const handleDragStart = (event: any) => {
    setIsSwiping(true);
  };

  const handleDragEnd = (event: any, position: any) => {
    setIsSwiping(false);
    setPosition({ x: 0, y: 0 });

    if (position.offset.x < -50) {
      handleSwipeLeft();
    } else if (position.offset.x > 50) {
      handleSwipeRight();
    }
  };

  let mouseDownTime = 0;
  const DELAY = 200; // adjust this value to your desired delay in milliseconds

  function handleMouseDown() {
    mouseDownTime = new Date().getTime();
  }

  function handleMouseUp() {
    const mouseUpTime = new Date().getTime();
    if (mouseUpTime - mouseDownTime < DELAY) {
      handleClick();
    }
  }

  function handleClick() {
    localStorage.setItem("pokemons", JSON.stringify(pokemons));
    localStorage.setItem("pokemon", JSON.stringify(currentPokemon));
    navigate(`/poketinder/${currentPokemon?.id}`);
  }

  const handleSwipeLeft = () => {
    const newDislikedPokemons = [...dislikedPokemons, currentPokemon].filter(
      (pokemon) => pokemon !== undefined
    ) as IPokemon[];
    setDislikedPokemons(newDislikedPokemons);
    const newPokemons = pokemons.filter(
      (pokemon: IPokemon) => pokemon.name !== currentPokemon?.name
    );
    setPokemons(newPokemons);
    setCurrentPokemon(newPokemons[0]);
  };

  const handleSwipeRight = () => {
    const newLikedPokemons = [...likedPokemons, currentPokemon].filter(
      (pokemon) => pokemon !== undefined
    ) as IPokemon[];
    setLikedPokemons(newLikedPokemons);
    const newPokemons = pokemons.filter(
      (pokemon: IPokemon) => pokemon.name !== currentPokemon?.name
    );
    setPokemons(newPokemons);
    setCurrentPokemon(newPokemons[0]);
  };

  return (
    <motion.div style={{ background }}>
      <div className="pokemon-tinder-container">
        <NavBar userProfileImage="https://i.imgur.com/4Z5HJ7A.png" />
        <motion.div
          className="pokemon-card-container"
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={
            isSwiping
              ? {
                  x: position.x,
                  y: position.y,
                  scale: 0.6,
                  boxShadow: "0px 0px 35px rgba(0, 0, 0, 0.35)",
                }
              : {
                  x: 0,
                  y: 0,
                  scale: 0.5,
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.35)",
                }
          }
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 20,
          }}
          style={{
            x,
            backgroundImage: `url(${currentPokemon?.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {currentPokemon && (
            <div className="pokemon-card-container">
              <div className="pokemon-details">
                <h2>{currentPokemon.name}</h2>
                <div className="pokemon-types">
                  {currentPokemon.types.map((type, index) => (
                    <span key={index} className={`pokemon-type ${type}`}>
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PokemonTinder;
