import express from 'express';
import UserModel from "../models/User.model.js";
import { claim } from '../controllers/food.controller.js'



const router = express.Router();
//Public Access :

export const renderSignupView = (req, res) => {
  res.render('signup')
}
//using only once Async await  as refrence,
//I will use promise.then.catch as tought in the class

//CRUD are not orderd as followes but as Authentication/Authorization:
//Public
export const createUser = async (req, res) => {
  const { userName, password } = req.body;
  console.log(req.body)
  const newUserModel = new UserModel({ userName, password })
  try {
    await newUserModel.save();
    console.log("success")
    res.status(201).json(newUserModel);
  }
  catch (error) {
    res.status(409).json({ message: error.message })
  }
}
export const renderLoginview = (req, res) => {
  res.render('login')
}
export const checkCredentials = (req, res) => {
  const { userName, password } = req.body

  console.log("checking ...", userName, password)
  UserModel.find({ userName, password })
    .then(user => {
      if (user) {
        req.session.currentUser = user[0];
        req.app.locals.isLoggedIn = true;
        req.app.locals.isAdmin = user.role === 'ADMIN'
        req.app.locals.userName = user.userName;
        renderProfile(req, res)
      } else {
        //Wrong password :
        res.render('login', { errorMessage: "wrong message" })
        // res.status(401).json({ message: "wrong pass" })
      }

    })
    .catch(err => res.status(500).json({ message: "Some internall server error.", error: err }))
}
//Authenticated :
export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) next(err);
    req.app.locals.userName = undefined;
    req.app.locals.isLoggedIn = false;
    req.app.locals.isAdmin = false
    res.redirect('/');
  })
}
export const renderProfile = (req, res) => {
  let user = req.session.currentUser;
  res.render('user-profile', user)

}

//Admin authorized :


export const getUsers = (req, res) => {
  let filter = req.body;
  UserModel.find(filter)
    .then(data => {
      res.status(200).json({ message: "List of Users with provided filter from client side", data, filter });
    })
    .catch(err => res.status(500).json({ message: "internal server Error 500 :" + err.message }))
}
/**
 *recives the ID of user andthe new role all in req.body and udate it in db
 * @param {*} req
 * @param {*} res
 */
export const toggleAdminRole = (req, res) => {
  const { targetUserId, role } = req.body;
  console.log("Making Admin...", targetUserId, role)
  UserModel.findByIdAndUpdate(targetUserId, { role: role }, { new: true })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => res.status(404).json({ message: error.message }))
}

export const modifyCoinsAmount = (req, res) => {
  const { targetUserId, num } = req.body;
  console.log("modifying : ", targetUserId, num)
  UserModel.findByIdAndUpdate(targetUserId, { $inc: { 'coins': num } }, { new: true })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => res.status(404).json({ message: error.message }))
}

export const claimFood = (req, res) => {
  //TODO Validation of location happens in Clinte Side. add server side validation later
  const { foodId, foodAmount } = req.body;
  let user = req.session.currentUser;
  if (claim(foodId)) {
    //all correct:
    UserModel.findByIdAndUpdate(user._id, { $inc: { 'coins': foodAmount } }, { new: true })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(error => res.status(404).json({ message: "error on adjusting user coins amount : " + error.message }))
  } else {
    res.status(500).json({ message: "Internal Server Error on deleting Food, see the console on server" })
  }
}
export default router;