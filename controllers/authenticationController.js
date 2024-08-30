const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

require("dotenv").config();


async function register(req, res, next) {
  try {
    const {
      username,
      email,
      password,
      role,
      phone,
    } = req.body;
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = new User({
      username,
      email,
      password,
      role,
      phone,
    });
    await user.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, email:user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    next(error);
  }
};

module.exports = {login,register}