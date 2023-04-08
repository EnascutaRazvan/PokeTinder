import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PokemonTinder from "./components/PokemonTinder";
import PokemonDetails from "./components/PokemonDetails";
import "./components/PokemonTinder.css";
import "./components/NavBar.css";
import "./components/PokemonDetails.css";
import Profile from "./components/Profile";
import "/Users/Razvan-PC/Desktop/Faculta/Bytex/Bytex---FIIPRACTIC/PokeTinder/Frontend/React/frontend/poketinder/node_modules/bootstrap/dist/css/bootstrap.css";
import "/Users/Razvan-PC/Desktop/Faculta/Bytex/Bytex---FIIPRACTIC/PokeTinder/Frontend/React/frontend/poketinder/node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/poketinder" element={<PokemonTinder />} />
          <Route path="/poketinder/:id" element={<PokemonDetails />} />
          <Route path="/poketinder/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
