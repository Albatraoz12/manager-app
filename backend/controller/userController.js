const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const identify = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user === null) {
      res.status(400);
      return;
    }

    res.status(200).json({
      user: {
        id: req.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

//Sign in controller
const signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.SECRET
      );

      return res
        .cookie('access_token', token, {
          httpOnly: process.env.NODE_ENV == 'production' ? true : false,
          secure: true,
          sameSite: 'none',
        })
        .status(200)
        .json({
          message: user.firstName + ' Signed in successfully',
          token: token,
        });
    } else if (!passwordMatch) {
      res.status(400).json({ message: 'Wrong Password, try again' });
    }
  } else {
    res.status(400).json({ message: 'sorry, could not login' });
  }
};

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

module.exports = { identify, signUp, signIn };
