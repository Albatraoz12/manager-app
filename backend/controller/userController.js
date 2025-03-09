const User = require('../models/User');
const bcrypt = require('bcrypt');

// Sign up controller
const signUp = async (req, res) => {
  try {
    //Validate if the client sends correct data
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Please fill in all fields' });
    }

    // Checking if the email is already in use
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ failedMessage: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      role: 'user',
      email,
      password: hashedPassword,
    });

    // Save user
    await newUser.save();

    res.status(201).json({ message: 'New user has been created!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signUp };
