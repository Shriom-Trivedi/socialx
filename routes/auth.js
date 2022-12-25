const router = require('express').Router();
const User = require('../models/Users');
const RefreshTokenModel = require('../models/RefreshTokenModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findOne } = require('../models/Users');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../token/generateToken');
const { verify } = require('../token/verify');

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
      refreshToken = generateRefreshToken(user);

      // Save refresh token in mongodb
      const find_refreshToken_in_schema = await RefreshTokenModel.findOne({
        user: user._id,
      });

      if (!find_refreshToken_in_schema) {
        const refreshTokenModel = new RefreshTokenModel({
          token: refreshToken,
          user: user._id,
        });
        await refreshTokenModel.save();
      } else {
        let newRefreshToken = await RefreshTokenModel.findOneAndUpdate(
          { user: user._id },
          { token: refreshToken },
          { new: true }
        );
      }
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(404).json('Wrong password');
    }
    res.status(200).json({ ...user, accessToken, refreshToken });
  } catch (err) {
    console.log('ERROR', err);
    res.status(500).json(err);
  }
});

router.post('/refresh', async (req, res) => {
  // take the refresh token from the user
  const refreshToken = req.body.token;

  // send error if there is no token or it is invalid
  if (!refreshToken) return res.status(401).json('You are not authenticated');
  const find_refreshToken_in_schema = await RefreshTokenModel.findOne({
    token: refreshToken,
  });
  if (!find_refreshToken_in_schema) {
    return res.status(403).json('Refresh token is not valid!');
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    async (err, user) => {
      err && console.log(err);

      // await find_refreshToken_in_schema.deleteOne(); // delete refresh token

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      await find_refreshToken_in_schema.updateOne({
        $set: { token: newRefreshToken },
      });

      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    }
  );
});

router.post('/logout', verify, async (req, res) => {
  const refreshToken = req.body.token;
  const find_refreshToken_in_schema = await RefreshTokenModel.findOne({
    token: refreshToken,
  });
  await find_refreshToken_in_schema.deleteOne();
  res.status(200).json('You have been logged out successfully!');
});

module.exports = router;
