const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
    verifyToken,
    verifyRefreshToken,
} = require("../middlewares/auth.middleware");
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
        const user = await User.findOne({ username });
        if (user)
            return res
                .status(400)
                .json({ success: false, message: "Username already taken" });
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        //Return token
        const tokens = generateTokens();
        updateToken(newUser._id, tokens.accessToken, tokens.refreshToken);
        return res
            .cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            })
            .json({
                success: true,
                message: "User created successfully",
                tokens,
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
        return res.status(400).json({
            success: false,
            message: "Username và password không được để trống",
        });
    try {
        //Check user
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({
                success: false,
                message: `Tài khoản không tồn tại`,
            });
        // Username found
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid)
            return res
                .status(400)
                .json({ success: false, message: "Sai mật khẩu" });
        //Success
        const tokens = generateTokens(user._id);
        updateToken(user._id, tokens.accessToken, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        }).json({
            success: true,
            message: "Đăng nhập thành công",
            user: user.username,
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
        const tokens = generateTokens(req.userId);
        updateToken(req.userId, tokens.accessToken, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        }).json({
            success: true,
            message: "Tokens refreshed",
            user: req.username,
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
    updateToken(req.userId, null, null);
    res.status(204).json({ success: true, message: "User logged out" });
});

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2h",
    });

    const refreshToken = jwt.sign(
        { userId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "24h" }
    );
    return { accessToken, refreshToken };
};

const updateToken = async (userId, accessToken, refreshToken) => {
    try {
        //Get user
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { accessToken, refreshToken },
            { new: true }
        );
        if (!user)
            return res
                .status(401)
                .json({ success: false, message: "User not exist" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = router;
