const express = require('express');
const router = express.Router();

const { signUp, signIn, identify } = require('../controller/userController');
const { authorization } = require('../authorization/auth');

//@desc Authorized a user
//@routes GET /user/protected
//@access Public
router.get('/protected', authorization, identify);

//@desc Login A User
//@routes POST /api/user/login
//@access Public
router.post('/signin', signIn);

//@desc Register A User
//@routes POST /api/user/register
//@access Public
router.post('/signup', signUp);

module.exports = router;
