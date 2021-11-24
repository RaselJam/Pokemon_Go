import express from 'express';
import PokemonModel from "../models/Pokemon.model.js";

export const renderCreatePokemonView = (req, res) => {

  res.render('POKEMONS/pokemon-create', { created: false });

}
export const createPokemon = (req, res) => {
  const { name, description, attack, life, imageURL, lat, long } = req.body;
  console.log("creating Pokemon..... : ", { name, description, attack, life, imageURL, lat, long });
  let location = { type: 'Point', coordinates: [+lat, +long] }
  PokemonModel.create({ name, description, attack, life, imageURL, location })
    .then(pokemon => {
      res.render('POKEMONS/pokemon-create', { created: true });
    })
    .catch(err => console.log("internal Error :" + err));
}

export const renderSinglePokemonView = (req, res) => {
  const pokemonId = req.params.id;
  console.log(pokemonId);
  PokemonModel.findById(pokemonId)
    .then(pokemon => {
      res.render('POKEMONS/pokemon-details', pokemon)
    })
    .catch(err => console.log("internal Error 500" + err))



}
