require("dotenv").config();
const jwt = require("jsonwebtoken");
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

module.exports = generateTokens;
