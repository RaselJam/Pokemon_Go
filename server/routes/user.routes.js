import express from 'express';
import { getUsers, createUser, renderSignupView, renderLoginview, checkCredentials, logout, modifyCoins, renderProfile, toggleAdminRole,claimFood } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/login', renderLoginview)
router.post('/login', checkCredentials)
router.get('/logout', logout)
router.get('/signup', renderSignupView);
router.post('/signup', createUser);
///Protected :
//TODO limit the access to all below end points :
//Authenticated :
router.use((req, res, next) => {

  if (req.session.currentUser) {
    // console.log("user is logedIn continue")
    // console.log("currentUser :", req.session.currentUser)
    next();
  } else {
    console.log("user is loged out redirect to login")
    renderLoginview(req, res)
  }
})
router.get('/profile', renderProfile)
router.patch('/claimFood', claimFood);
//Athorized only Admins :
router.use((req, res, next) => {

  if (req.session.currentUser[0].role !== 'ADMIN') {
    res.status(401).json({ message: "un Authorized. Access denied" })
  }
  else next();
})
router.get('/all', getUsers);
router.patch('/toggle-admin', toggleAdminRole)

// router.get('/:id', getUser);
// router.patch('/:id', updateUser);
// router.delete('/:id', deleteUser);

export default router;