import express from 'express';
import FoodModel from "../models/Food.model";
export const claim = (foodId) => {
  FoodModelUser.findByIdAndRemove(foodId)
    .then(foodDeleted)
    .catch(err => resizeBy.status(500).json({ mesage: err.mesage }));

}
function foodDeleted(deletedfood) {
  setTimeout(() => {
    delete deletedfood._id;
    FoodModel.create(deletedfood)
      .then()
      .catch(err => console.log("Error on Re-creating a claimed Food after 10 min"))
  }, 600000)


}