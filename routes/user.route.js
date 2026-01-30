const express = require("express");
const { protect} = require("../middleware/auth");
const { register, login, profile, logout } = require("../controller/user.controller");
const router3 = express.Router();

router3.post("/register", register);
router3.post("/login", login);
router3.post("/logout", logout);
router3.get("/profile", protect, profile);

module.exports = router3;