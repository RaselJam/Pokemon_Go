import express from 'express';
import UserModel from "../models/User.model.js";



const router = express.Router();

export const getUsers = async (req, res) => {
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
export const renderSignupView = (req, res) => {
  //TODO view : render corresponding View, to show signeup form :


}
export const createUser = async (req, res) => {
  const { name, password } = req.body;
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
export const renderLoginview = (req, res) => {
  //TODO view , render corresponded view. to show login form :
}
/**
 *It will checkand log in the user.
 * @param {*} req
 * @param {*} res
 */
export const checkCredentials = (req, res) => {
  const { userName, password } = req.body

  console.log("checking ...", userName, password)
  //TODO addencyption
  UserModel.find({ userName, password })
    .then(user => {
      console.log("called db", user)
      if (user) {
        //Todo correcto :
        req.session.currentUser = user;
        //TODO redirect to user Profile

        res.redirect('/');
      } else {
        //Wrong password :
        res.status(401).json({ message: "wrong pass" })
      }

    })
    .catch(err => res.status(500).json({ message: "Some internall server error.", error: err }))
}
export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  })
}
export const updateUser = async (req, res) => {
  let user = req.body;
  const userName = user.userName;
  delete user.userName;
  UserModel.findOneAndUpdate({ userName: userName }, user)
    .then(result => {
      //TODO Render success
      res.status(200).json({ message: "suscceess fully updated" })

    })
    .catch(err => res.status(500).json({ message: "Some internall server error.", error: err }))

}
export default router;