const express = require('express');
const { authorization } = require('../authorization/auth');
const { createTask } = require('../controller/taskController');
const router = express.Router();

//@desc Creates a Task for a user
//@routes POST /task/createTask/:uid
//@access Private
router.post('/createTask/:uid', authorization, createTask);

module.exports = router;
