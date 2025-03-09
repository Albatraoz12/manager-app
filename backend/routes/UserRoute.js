const express = require('express');
const router = express.Router();

const { signUp } = require('../controller/userController');

//@desc Register A User
//@routes POST /user/register
//@access Public
router.post('/signup', signUp);

module.exports = router;
