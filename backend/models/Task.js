const mongoose = require('mongoose');

const userTasks = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 50,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    listRole: {
      type: String,
      max: 20,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserList', userTasks);
