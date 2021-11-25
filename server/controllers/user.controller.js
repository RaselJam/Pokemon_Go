import express from 'express';
import UserModel from "../models/User.model.js";
import * as pokemonLogic from '../controllers/pokemon.controller.js'
import { claim } from '../controllers/food.controller.js'
import ObjectId from 'mongodb';

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
    res.render('login')
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
        req.app.locals.isAdmin = user[0].role === 'ADMIN'
        req.app.locals.userName = user.userName;
        renderProfile(req, res)
      } else {
        //Wrong password :
        res.render('login', { errorMessage: "wrong message" })
        // res.status(401).json({ message: "wrong pass" })
      }

    }).catch(err => {
      console.log(err)

    })
  // .catch(err => res.status(500).json({ err }))
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

  let userPokemons = []
  pokemonLogic.getMyPokemons(user._id).then(result => {

    res.render('user-profile', { user, pokemons: result })

  }).catch(err => console.log("Internal Error 500 " + err));


}

//Admin authorized :
export const getUsers = (req, res) => {
  let filter = req.body;
  UserModel.find(filter)
    .then(data => {
      //TODO Render a view instead of Json
      res.status(200).json({ message: "List of Users with provided filter from client side", data, filter });
    })
    .catch(err => res.status(500).json({ message: "internal server Error 500 :" + err.message }))
}
export const renderUserListView = (req, res) => {

  UserModel.find()
    .then(data => {
      res.render('user-list', { users: data })
    })
    .catch(err => res.status(500).json({ message: "internal server Error 500 :" + err.message }))

}
export const renderAdminContolPanel = () => {
  const users = getUsersList();
  const pokemons = pokemonLogic.getPokemonsList();
  res.render('control-panel')
}
/**
 *recives the ID of user and the new role all in req.body and udate it in db
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
  console.log("Reached to ClaimFood with", foodId, foodAmount)
  let user = req.session.currentUser;
  let resultonClaimFood = claim(foodId)
  if (resultonClaimFood) {
    //all correct:
    console.log("food deleted from db gong to update user coins  user id: " + user._id)

    UserModel.findByIdAndUpdate(user._id, { $inc: { 'coins': foodAmount } }, { new: true })
      .then(result => {
        console.log("resut on updating Coins after claim :", result)
        reloadUser(req);
        res.status(200).json({ result: true })
      })
      .catch(error => res.status(404).json({ message: "error on adjusting user coins amount : " + error }))
  } else {
    console.log("claim(food) return falssy")
    res.status(500).json({ message: "Internal Server Error on deleting Food, see the console on server" })
  }
}
//
//helpers
export const getUsersList = () => {

  UserModel.find()
    .then(data => {
      return data
    })
    .catch(err => {
      console.log("internal server Error")
      return;
    })
}
const reloadUser = (req) => {
  let user = req.session.currentUser
  if (user) {
    UserModel.findById(user._id)
      .then(reloaded => {
        console.log("old user", user)
        console.log("reloaded", reloaded)
        req.session.currentUser = reloaded;
      }).catch(err => console.log("internal server error : " + err))
  }

}
export default router;