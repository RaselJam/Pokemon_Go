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
export const renderEditPokemonView = (req, res) => {
  const pokemonId = req.params.id;
  console.log(pokemonId);
  PokemonModel.findById(pokemonId)
    .then(pokemon => {
      res.render('POKEMONS/pokemon-edit', pokemon)
    })
    .catch(err => console.log("internal server  Error 500" + err))

}
export const updatePokemon = (req, res) => {
  const { pokemonId, name, description, attack, life, imageURL, lat, long } = req.body;
  console.log("Updating Pokemon..... : ", { pokemonId, name, description, attack, life, imageURL, lat, long });
  let location = { type: 'Point', coordinates: [+lat, +long] }
  PokemonModel.findByIdAndUpdate(pokemonId, { name, description, attack, life, imageURL, location }, { new: true })
    .then(pokemon => {
      res.render('POKEMONS/pokemon-details', pokemon)
    })
    .catch(err => console.log("internal server  Error 500" + err))
}
export const deletePokemon = (req, res) => {
  const { pokemonId } = req.body
  PokemonModel.findByIdAndRemove(pokemonId)
    .then(deletedPokemon => {
      res.render('control-panel')
    })
    .catch(err => console.log("internal server  Error 500" + err))
}
export const renderAllPokemonView = (req, res) => {
  PokemonModel.find()
    .then(pokemons => {
      res.render('POKEMONS/pokemon-index', { pokemons })
    })
    .catch(err => console.log("internal server  Error 500" + err))



}

//return JASON :
export const getPokemons = (req, res) => {
  PokemonModel.find()
    .then(pokemons => {
      res.status(200).json({ message: "gotAllPokemons", data: pokemons })
    })
    .catch(err => res.status(500).json({ message: "Internall Server Error", error: err }))
}

export const claimPokemon = (req, res) => {
  //TODO add some validation about the correct location and claim
  const userId = req.session.currentUser._id;
  const { pokemonId } = req.body;
  if (!userId) {
    res.redirect('/users/login');
  }
  PokemonModel.findByIdAndUpdate(pokemonId, { location: { coordinates: [0, 0] }, ownerId: userId }, { new: true })
    .then(pokemon => {
      res.status(200).json({ message: "Pokemon claimed susccessfully", data: pokemon })
    }).catch(err => res.status(500).json({ message: "Internall Server Error", error: err }))

}
/**
 *
 * @param {the User ID} ownerId
 */
export const getMyPokemons = (ownerId) => {
  PokemonModel.find({ownerId:ownerId})
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log("intrenal Server Error" + err)
      return false
    })
}