const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '15d',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET_KEY);
};

module.exports = { generateAccessToken, generateRefreshToken };
