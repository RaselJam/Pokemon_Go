import express from 'express';
import { getUsers, createUser, renderSignupView, renderLoginview, checkCredentials, logout, updateUser } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/login', renderLoginview)
router.post('/login', checkCredentials)
router.get('/logout', logout)
router.get('/signup', renderSignupView);
router.post('/signup', createUser);
///Protected :
//TODO limit the access to all below end points :

router.get('/all', getUsers);
router.patch('/updateUser', updateUser);

// router.get('/:id', getUser);
// router.patch('/:id', updateUser);
// router.delete('/:id', deleteUser);

export default router;