const updateTokens = require('./lib/updateTokens')
const { AUTH_ACTION } = require("../../constants");
const logout = async (req, res) => {
    const user = req.user;
    updateTokens(AUTH_ACTION.LOGOUT, {
        user,
        accessToken: null,
        refreshToken: null,
    });
    res.status(204).json({ success: true, message: "User logged out" });
}

module.exports = logout