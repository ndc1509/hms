const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Check access token
const verifyToken = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    const accessToken = authHeader && authHeader.split(" ")[1];

    //Token not found
    if (!accessToken)
        return res
            .status(401)
            .json({ success: false, message: "Access token not found" });
    try {
        //Decode token
        const decoded = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        );
        //Find user
        const user = await User.findOne({
            _id: decoded.userId,
            accessToken,
        });
        //User not found
        if (!user)
            return res
                .status(401)
                .json({ success: false, message: "User does not exist" });
        //Forward
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res
            .status(403)
            .json({ success: false, message: "Invalid access token" });
    }
};


//Check refresh token
const verifyRefreshToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    //Token not found
    if (!refreshToken)
        return res
            .status(401)
            .json({ success: false, message: "Refresh token not found" });
    try {
        //Decode token
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        //Find user
        const user = await User.findOne({
            _id: decoded.userId,
            refreshToken,
        });
        //User not found
        if (!user)
            return res
                .status(401)
                .json({ success: false, message: "User does not exist" });
        //Forward
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res
            .status(403)
            .json({ success: false, message: "Invalid refresh token" });
    }
};

module.exports = { verifyRefreshToken, verifyToken };
