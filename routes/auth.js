const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const { findOne } = require('../models/Users');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../token/generateToken');

// REGISTER
router.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    // Generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const newUser = new User({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
    });
    // Save user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let accessToken;
  let refreshToken;
  try {
    const user =
      (await User.findOne({ email: email })) ||
      (await User.findOne({ username: email }));
    if (!user) {
      res.status(404).json('User not found');
    }

    if (user) {
      // Generate access token
      accessToken = generateAccessToken(user);
      console.log('AFTER GEN TOKEN', accessToken);
      refreshToken = generateRefreshToken(user);
      console.log('AFTER REF TOKEN', refreshToken);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(404).json('Wrong password');
    }
    console.log('RETURN CONSOLE', { ...user, accessToken, refreshToken });
    res.status(200).json({ ...user, accessToken, refreshToken });
  } catch (err) {
    console.log('ERROR', err);
    res.status(500).json(err);
  }
});

module.exports = router;
