const express = require('express');
const { authorization } = require('../authorization/auth');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../controller/taskController');
const router = express.Router();

//@desc Creates a Task for a user
//@routes POST /task/createTask/:uid
//@access Private
router.post('/createTask/:uid', authorization, createTask);

//@desc Gets all list for the userId
//@routes GET /task/getTasks/:id
//@access Private
router.get('/getTasks/:uid', authorization, getTasks);

//@desc Validates if users ID from token == task.user and then updates the task
//@routes PUT /task/editTask/:lid
//@access Private
router.put('/editTask/:lid', authorization, updateTask);

//@desc Validates if users ID from token == task.user and then deletes it
//@routes Delete /:id
//@access Private
router.delete('/:id', authorization, deleteTask);

module.exports = router;
