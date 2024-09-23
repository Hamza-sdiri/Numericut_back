const {
  register,
  login,
  getAllUsers,
  deleteUser
} = require("../controllers/authenticationController");
const express = require("express");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/allUsers", getAllUsers)
router.delete('/deleteUser/:id',deleteUser)

module.exports = router;