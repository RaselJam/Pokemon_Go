import express from 'express';
import * as foodLogic from '../controllers/food.controller.js'
import * as userLogic from '../controllers/user.controller.js';


const router = express.Router();

// router.use((req, res, next) => {
//   if (req.session.currentUser) {
//     next();
//   } else {
//     console.log("user is loged out redirect to login")
//     userLogic.renderLoginview(req, res)
//   }
// })
//CRUD
//Create :
//It uses post as we need to recive a possible filter in body
router.get('/create', foodLogic.renderCreateFoodView)
router.post('/create', foodLogic.createFood)
//Read
router.post('/', foodLogic.renderFoodListByFilter)
router.get('/', foodLogic.renderAllFoodListView)
router.post('/jason', (req, res) => {
  foodLogic.getFoodByFilter(req, res)
})
//Update
router.get('/update/:id',foodLogic.renderEditFoodView)
router.post('/update', foodLogic.updateFood)
//Delete
router.post('/delete', foodLogic.deleteFood)
//Read single Food:

export default router;