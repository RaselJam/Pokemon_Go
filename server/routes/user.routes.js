import express from 'express';
import * as userlogic from '../controllers/user.controller.js';

const router = express.Router();

router.get('/login', userlogic.renderLoginview)
router.post('/login', userlogic.checkCredentials)
router.get('/logout', userlogic.logout)
router.get('/signup', userlogic.renderSignupView);
router.post('/signup', userlogic.createUser);
///Protected :
//Authenticated :
router.use((req, res, next) => {

  if (req.session.currentUser) {
    next();
  } else {
    console.log("user is loged out redirect to login")
    userlogic.renderLoginview(req, res)
  }
})
router.get('/profile', userlogic.renderProfile)
router.patch('/claimFood', userlogic.claimFood);

//Athorized only Admins :
router.use((req, res, next) => {
  console.log("got into gateguard")
  console.log(req.session.currentUser)
  if (req.session.currentUser.role !== 'ADMIN') {
    res.status(401).json({ message: "un Authorized. Access denied" })
  }
  else next();
})
router.post('/all', userlogic.getUsers);
router.patch('/toggle-admin', userlogic.toggleAdminRole)



export default router;