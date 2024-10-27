
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

exports.registerUser = async (req, res) => {
  try {
    console.log('Received registration request:', req.body);
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      username,
      email,
      password
    });

    if (user) {
      console.log('User created successfully:', user.email);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      console.log('Invalid user data');
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Server error during registration:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    console.log('Received login request:', req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      console.log('User logged in successfully:', user.email);
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      console.log('Invalid login attempt for:', email);
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Server error during login:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};