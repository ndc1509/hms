const generateTokens = require('./lib/generateTokens')
const updateTokens = require('./lib/updateTokens')
const { AUTH_ACTION } = require("../../constants");
const refreshToken = async (req, res) => {
    try {
        const user = req.user;
        //Gen and save access token only
        const tokens = generateTokens({
            userId: user._id,
            username: user.username,
        });
        updateTokens(AUTH_ACTION.REFRESH_TOKEN, {
            user,
            ...tokens,
        });
        //console.log("token refreshed" + tokens.accessToken);
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
}
module.exports = refreshToken