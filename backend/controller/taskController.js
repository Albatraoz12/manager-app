const User = require('../models/User');
const Task = require('../models/Task');

const createTask = (req, res) => {
  try {
    const uid = req.params.uid;
    if (req.userId === uid) {
      if (req.body.title.length > 0) {
        const newTask = new Task({
          title: req.body.title,
          description: req.body.description,
          user: uid,
        });
        newTask
          .save()
          .then(res.status(200).json({ message: 'new task has been created' }));
      } else {
        res.status(406).json({ ErrorMessage: 'Please put in a title' });
      }
    } else {
      res.status(400).json({ ErrorMessage: 'wrong userId' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getTasks = async (req, res) => {
  try {
    const user = User.findOne({ _id: req.userId });
    if (user) {
      const uid = req.params.uid;
      if (req.userId === uid) {
        const tasks = await Task.find({ user: uid });
        res.status(200).json({ message: tasks });
      } else {
        res.status(401).json({ ErrorMessage: 'Wrong crediantials!' });
      }
    } else {
      res.status(404).json({ ErrorMessage: 'You are not an user!' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const validUser = await User.findOne({ _id: req.userId });
    const id = req.params.lid;
    if (validUser) {
      const task = await Task.findOne({ _id: id });
      if (task.user == validUser.id) {
        const options = { new: true };
        const editTask = await Task.findByIdAndUpdate(id, req.body, options);
        res.status(200).json({
          message: 'List with ID ' + id + ' has now been updated!',
        });
      } else {
        res.status(403).json({
          ErrorMessage: 'You are not the owner!',
        });
      }
    } else {
      res.status(400).json({ ErrorMessage: 'You are not an user!' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the task
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check if the task belongs to the user
    if (task.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: 'You are not the owner of this task!' });
    }

    // Delete the task
    await Task.deleteOne({ _id: id });

    res.status(200).json({ message: `${task.title} has now been deleted!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Invalid Id or server error!' });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
