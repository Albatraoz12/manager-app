const express = require('express');
const router = express.Router();

const { signUp, signIn } = require('../controller/userController');

//@desc Login A User
//@routes POST /api/user/login
//@access Public
router.post('/signin', signIn);

//@desc Register A User
//@routes POST /api/user/register
//@access Public
router.post('/signup', signUp);

module.exports = router;
