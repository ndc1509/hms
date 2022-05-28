const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
    verifyToken,
    verifyRefreshToken,
} = require("../middlewares/auth.middleware");
const { AUTH_ACTION } = require("../lib/constants");
require("dotenv").config();

//REGISTER
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    //Validate
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: "Missing username/password" });
    try {
        //Check user exist
        const existedUser = await User.findOne({ username });
        if (existedUser)
            return res
                .status(400)
                .json({ success: false, message: "Username already taken" });
        //Hash password and save user
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        //Gen and save tokens
        const tokens = generateTokens({
            userId: newUser._id,
            username: newUser.username,
        });
        updateToken(AUTH_ACTION.REGISTER, {
            user: newUser,
            ...tokens,
        });
        //Response
        res.status(201)
            .cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            })
            .json({
                success: true,
                message: "User created successfully",
                accessToken: tokens.accessToken,
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    //Validate
    if (!username || !password)
        return res
            .status(400)
            .json({
                success: false,
                message: "Username và password không được để trống",
            });
    try {
        //Check user
        const user = await User.findOne({ username });
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: "Tài khoản không tồn tại" });
        // Username found then check password
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid)
            return res
                .status(400)
                .json({ success: false, message: "Sai mật khẩu" });
        //Gen and save tokens
        const tokens = generateTokens({
            userId: user._id,
            username: user.username,
        });
        updateToken(AUTH_ACTION.LOGIN, {
            user,
            ...tokens,
        });
        //Response
        res.status(200)
            .cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            })
            .json({
                success: true,
                message: "Đăng nhập thành công",
                accessToken: tokens.accessToken,
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

//REFRESH TOKEN
router.post("/token", verifyRefreshToken, async (req, res) => {
    try {
        const user = req.user;
        //Gen and save access token only
        const tokens = generateTokens({
            userId: user._id,
            username: user.username,
        });
        updateToken(AUTH_ACTION.REFRESH_TOKEN, {
            user,
            ...tokens,
        });
        console.log("token refreshed" + tokens.accessToken);
        //Response
        res.status(200).json({
            success: true,
            message: "Tokens refreshed",
            accessToken: tokens.accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

//LOGOUT
router.delete("/logout", verifyToken, async (req, res) => {
    const user = req.user;
    updateToken(AUTH_ACTION.LOGOUT, {
        user,
        accessToken: null,
        refreshToken: null,
    });
    res.status(204).json({ success: true, message: "User logged out" });
});

const generateTokens = (payload) => {
    const { userId, username } = payload;
    const accessToken = jwt.sign(
        { userId, username },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "100s",
        }
    );

    const refreshToken = jwt.sign(
        { userId, username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "24h" }
    );
    return { accessToken, refreshToken };
};

const updateToken = async (action, payload) => {
    const { user, accessToken, refreshToken } = payload;
    try {
        if (action === AUTH_ACTION.REFRESH_TOKEN) {
            await User.findOneAndUpdate({ _id: user.id }, { accessToken });
        } else {
            await User.findOneAndUpdate(
                { _id: user.id },
                { accessToken, refreshToken }
            );
        }
    } catch (error) {
        throw error;
    }
};

module.exports = router;
