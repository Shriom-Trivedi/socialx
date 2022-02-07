const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { findOne } = require("../models/Users");

// REGISTER
router.post("/register", async (req, res) => {
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
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(404).json("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(404).json("Wrong password");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
