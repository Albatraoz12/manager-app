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

module.exports = { createTask };
