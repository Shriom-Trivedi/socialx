const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // splitting token and bearer
    const token = authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json('Token is invalid');
      }
      req.user = user;

      next();
    });
  } else {
    res.status(401).json('You are not authenticated!');
  }
};

module.exports = { verify };
