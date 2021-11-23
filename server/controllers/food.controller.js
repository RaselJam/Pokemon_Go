import express from 'express';
import FoodModel from "../models/Food.model.js";
const router = express.Router();
//CRUD
export const createFood = (req, res) => {
  const { name, description, amount, coordinates } = req.body;
  const location = { type: "POINT", coordinates }
  FoodModel.create({ name, description, amount, location })
    .then(data => {
      res.status(200).json({ message: "food Created ", data })
    })
    .catch(error => res.status(500).json({ message: "internal server Error 500 : " + error.mesage }))
}
export const getFoodByFilter = (req, res) => {
  const filter = req.body;
  FoodModel.find(filter)
    .then(data => {
      res.status(200).json({ message: "List of Foods with provided filter from client side", data, filter });
    })
    .catch(err => res.status(500).json({ message: "internal server Error 500 :" + err.message }))

}
export const updateFood = (req, res) => {
  const { foodId, name, description, amount, coordinates } = req.body;
  const location = { type: "POINT", coordinates }
  FoodModel.findByIdAndUpdate(foodId, { name, description, amount, location }, { new: true })
    .then(data => {
      res.status(200).json({ message: "food updtaed ", data })
    })
    .catch(error => res.status(500).json({ message: "internal server Error 500 : " + error.mesage }))
}
export const deleteFood = (req, res) => {
  const { foodId } = req.body;
  FoodModel.findByIdAndDelete(foodId)
    .then(data => {
      res.status(200).json({ message: "food deleted ", data })
    })
    .catch(error => res.status(500).json({ message: "internal server Error 500 : " + error.mesage }))
}



export const claim = (foodId) => {
  FoodModelUser.findByIdAndRemove(foodId)
    .then((deletedFood) => {
      onFoodDeleted(deletedFood)
      return true;
    })
    .catch(err => {
      console.log("Error on deleting the food", err.mesage);
      return false;
    })

}
///Fo feature Axios SPA updating, We decided to use Form to edit the whole object:
export const movefoodTo = (req, res) => {
  const { foodId, coordinates } = req.body;
  const location = { type: "POINT", coordinates }
  FoodModel.findByIdAndUpdate(foodId, { location }, { new: true })
    .then(data => {
      res.status(200).json({ message: "food moved Successfully", data })
    })
    .catch(error => res.status(500).json({ message: "internal server Error 500 : " + error.mesage }))
}
//internal functions  :
function onFoodDeleted(deletedfood) {
  setTimeout(() => {
    delete deletedfood._id;
    FoodModel.create(deletedfood)
      .then()
      .catch(err => console.log("Error on Re-creating a claimed Food after 10 min"))
  }, 600000)


}