import express from 'express';
import UserModel from "../models/User.model.js";



const router = express.Router();
//Public Access :

export const renderSignupView = (req, res) => {

  res.render('signup')
}
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
/**
 *It will check and log in the user.
 * @param {*} req
 * @param {*} res
 */
export const checkCredentials = (req, res) => {
  const { userName, password } = req.body

  console.log("checking ...", userName, password)
  //TODO adde ncyption
  UserModel.find({ userName, password })
    .then(user => {
      console.log("called db", user)
      if (user) {
        req.session.currentUser = user;
        req.app.locals.isLoggedIn = true;
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
    res.redirect('/');
  })
}
export const renderProfile = (req, res) => {
  let user = req.session.currentUser;

  console.log("req.seccion.currentUser", user);
  res.end();

}

//Admin authorized :
export const updateUser = async (req, res) => {
  let user = req.body;
  const userName = user.userName;
  delete user.userName;
  UserModel.findOneAndUpdate({ userName: userName }, user)
    .then(result => {
      //TODO Render success
      res.status(200).json(result)

    })
    .catch(err => res.status(500).json({ message: "Some internall server error.", error: err }))
}
export const getUsers = async (req, res) => {
  console.log("enetered to get all users:")
  //TODO ADD Filter Logic :
  let filter = req.body;
  console.log(filter)
  try {
    UserModel.find(filter)
      .then(data => {
        console.log(data)
        res.status(200).json(data);
      }
      )
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}
export default router;