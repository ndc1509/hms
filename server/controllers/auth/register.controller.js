const generateTokens = require('./lib/generateTokens')
const updateTokens = require('./lib/updateTokens')
const User = require('../../models/Guest')
const { AUTH_ACTION } = require("../../constants");
const argon2 = require("argon2");
const register = async (req, res) => {
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
        updateTokens(AUTH_ACTION.REGISTER, {
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
}

module.exports = register