const express = require("express");
const router = express.Router();
const {
    verifyToken,
    verifyRefreshToken,
} = require("../middlewares/auth.middleware");

const register = require("../controllers/auth/register.controller");
const login = require("../controllers/auth/login.controller");
const logout = require("../controllers/auth/logout.controller");
const refreshToken = require("../controllers/auth/refreshToken.controller");
//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

//REFRESH TOKEN
router.post("/token", verifyRefreshToken, refreshToken);

//LOGOUT
router.delete("/logout", verifyToken, logout);

module.exports = router;
