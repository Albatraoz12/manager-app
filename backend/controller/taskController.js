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

module.exports = { createTask, getTasks };
