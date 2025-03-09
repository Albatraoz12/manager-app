const express = require('express');
const { authorization } = require('../authorization/auth');
const { createTask, getTasks } = require('../controller/taskController');
const router = express.Router();

//@desc Creates a Task for a user
//@routes POST /task/createTask/:uid
//@access Private
router.post('/createTask/:uid', authorization, createTask);

//@desc Gets all list for the userId
//@routes GET /task/getTasks/:id
//@access Private
router.get('/getTasks/:uid', authorization, getTasks);

module.exports = router;
