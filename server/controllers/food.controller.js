import express from 'express';
import FoodModel from "../models/Food.model.js";

const router = express.Router();
//CRUD :1-Rendering or 2-Return Jason
//Rendering
export const renderCreateFoodView = (req, res) => {
  res.render('FOOD/food-create')
}


//
export const createFood = (req, res) => {
  const { name, description, amount, coordinates } = req.body;

  const location = { type: "Point", coordinates: coordinates }
  console.log("Creating Food...: ", { name, description, amount, location })
  FoodModel.create({ name, description, amount, location })
    .then(data => {
      res.render('FOOD/food-create', data)
    })
    .catch(error => res.status(500).json({ message: "internal server Error 500 : " + error }))
}
export const getFoodByFilter = (req, res) => {
  const filter = req.body;
  FoodModel.find(filter)
    .then(data => {
      res.status(200).json({ message: "List of Foods with provided filter from client side", data, filter });
    })
    .catch(err => res.status(500).json({ message: "internal server Error 500 :" + err.message }))

}
export const renderFoodList = (req, res) => {
  const filter = req.body;
  FoodModel.find(filter)
    .then(foods => {
      res.render('/FOOD/food', foods)
    })
    .catch(err => res.status(500).json({ message: "Some internal Server Erorr 500:  " + err.mesage }))
}

export const renderEditFoodView = (req, res) => {
  const foodId = req.params.id;
  FoodModel.findById(foodId)
    .then((food) => {
      console.log("found Food :", food)
      res.render('FOOD/food-edit', food)

    }
    ).catch(err => console.log("Internall server Error:", err))




}
export const updateFood = (req, res) => {
  const { foodId, name, description, amount, lat, long } = req.body;
  const location = { type: "Point", coordinates: [+lat, +long] }
  console.log("updatig .....", { foodId, name, description, amount, location })
  FoodModel.findByIdAndUpdate(foodId, { name, description, amount, location }, { new: true })
    .then(data => {
      res.status(200).json({ message: "food updtaed ", data })
    })
    .catch(error => res.status(500).json({ message: "internal server Error 500 : " + error }))
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
  FoodModel.findByIdAndRemove(foodId)
    .then((deletedFood) => {
      onFoodDeleted(deletedFood)
      return true;
    })
    .catch(err => {
      console.log("Error on deleting the food", err.mesage);
      return false;
    })

}
export const movefoodTo = (req, res) => {
  const { foodId, coordinates } = req.body;
  const location = { type: "POINT", coordinates }
  FoodModel.findByIdAndUpdate(fooId, { location }, { new: true })
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