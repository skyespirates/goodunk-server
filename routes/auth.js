const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Login
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json("Invalid credentials");
    } else {
      bcrypt.compare(password, user.password, function (error, isMatch) {
        if (error) {
          throw error;
        } else if (!isMatch) {
          res.status(401).json("Unauthorized");
        } else {
          res.status(200).json(user);
        }
      });
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
});

module.exports = router;
