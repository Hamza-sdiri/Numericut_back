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
      {
        userId: user._id,
        role: user.role,
        email: user.email,
        username: user.username,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.json({ token, role: user.role ,username:user.username });
  } catch (error) {
    next(error);
  }

};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;  // Extract user ID from the request parameters
    const user = await User.findByIdAndDelete(id);  // Use Mongoose's findByIdAndDelete method

    if (!user) {
      return res.status(404).json({ message: 'User not found' });  // If the user doesn't exist, return 404
    }

    res.json({ message: 'User deleted successfully', user });  // Respond with a success message and the deleted user data
  } catch (error) {
    next(error);  // Pass the error to the error-handling middleware
  }
};
module.exports = { login, register, getAllUsers };