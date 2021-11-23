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
router.post('/foods', foodLogic.getFoodByFilter)
