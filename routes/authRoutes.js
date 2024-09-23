const {
  register,
  login,
  getAllUsers
} = require("../controllers/authenticationController");
const express = require("express");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/allUsers", getAllUsers)

module.exports = router;