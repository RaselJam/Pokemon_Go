import express from 'express';
import * as pokemonLogic from '../controllers/pokemon.controller.js';

const router = express.Router();

router.get('/create', pokemonLogic.renderCreatePokemonView)
router.post('/create', pokemonLogic.createPokemon);
router.get('/:id', pokemonLogic.renderSinglePokemonView)
router.get('/:id', pokemonLogic.renderEditPokemonView)
 router.post('/update', pokemonLogic.updatePokemon)


export default router;