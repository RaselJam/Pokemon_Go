import express from 'express';
import * as foodLogic from '../controllers/food.controller.js'

const router = express.Router();

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    console.log("user is loged out redirect to login")
    renderLoginview(req, res)
  }
})
//CRUD
//Create :
//It uses post as we need to recive a possible filter in body
router.post('/create', foodLogic.createFood)
//Read
router.post('/', (req, res) => {
  foodLogic.getFoodByFilter(req, res)
})
//Update
router.patch('/update', foodLogic.updateFood)
//Delete
router.post('/delete', foodLogic.deleteFood)
//Read single Food:
router.get('/:id', foodLogic.renderSingleFood)
