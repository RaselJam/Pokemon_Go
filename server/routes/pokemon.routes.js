import express from 'express';
import * as pokemonLogic from '../controllers/pokemon.controller.js';

const router = express.Router();

router.get('/create',pokemonLogic.renderCreatePokemonView)




export default router;