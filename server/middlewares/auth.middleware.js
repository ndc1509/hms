const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    //Không tồn tại token
    if (!token)
        return res.status(401).json({
            success: false,
            message: "Access token not found",
        });
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findOne({
            _id: decoded.userId,
            token,
        });
        if (!user) throw new Error("Invalid token");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            success: false,
            message: "Invalid token",
        });
    }
};

const verifyRefreshToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res
            .status(401)
            .json({ success: false, message: "Refresh token not found" });
    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        const user = await User.findOne({
            _id: decoded.userId,
            refreshToken,
        });
        if (!user) throw new Error("Invalid refresh token");
        req.userId = decoded.userId;
        req.username = user.username;
        next();
    } catch (error) {
        console.log(error);
        return res
            .status(403)
            .json({ success: false, message: "Invalid refresh token" });
    }
};

module.exports = { verifyRefreshToken, verifyToken };
