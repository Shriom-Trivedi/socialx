const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, 'mySecretKey', {
    expiresIn: '20s',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, 'myRefreshToken');
};

module.exports = { generateAccessToken, generateRefreshToken };
