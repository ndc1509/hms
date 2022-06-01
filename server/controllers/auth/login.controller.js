const generateTokens = require('./lib/generateTokens')
const updateTokens = require('./lib/updateTokens')
const User = require('../../models/User')
const argon2 = require('argon2')
const { AUTH_ACTION } = require("../../constants");

const login = async (req, res) => {
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
        updateTokens(AUTH_ACTION.LOGIN, {
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
}

module.exports = login