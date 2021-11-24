import express from 'express';
import PokemonModel from "../models/Pokemon.model.js";

export const renderCreatePokemonView= (req, res)=>{

res.render('POKEMONS/pokemon-create');

}
