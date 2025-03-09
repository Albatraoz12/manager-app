const express = require('express');
const router = express.Router();

const {
  signUp,
  signIn,
  identify,
  signOut,
} = require('../controller/userController');
const { authorization } = require('../authorization/auth');

//@desc Authorized a user
//@routes GET /user/protected
//@access Public
router.get('/protected', authorization, identify);

//@desc Register A User
//@routes POST /api/user/register
//@access Public
router.post('/signup', signUp);

//@desc Login A User
//@routes POST /api/user/login
//@access Public
router.post('/signin', signIn);

//@desc Logout A User
//@routes Get /user/logout
//@access Public
router.get('/signout', authorization, signOut);

module.exports = router;
