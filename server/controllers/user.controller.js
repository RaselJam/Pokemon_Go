import express from 'express';
import UserModel from "../models/User.model.js";

//npm import mongoose from 'mongoose';

const router = express.Router();

export const getUsers = async (req, res) => {
  //TODO ADD Filter Logic :
  try {
    UserModel.find()
      .then(data => {
        res.status(200).json(data);
      }
      )
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}
export const createUser = async (req, res) => {
  const { name, password } = req.body;
  console.log(" Revived to server :", name, password);
  const newUserModel = new UserModel({ name, password })
  try {
    await newUserModel.save();
    console.log("success")
    res.status(201).json(newUserModel);

  }
  catch (error) {
    res.status(409).json({ message: error.message })
  }
}
export default router;