const User = require("../../../models/User");
const { AUTH_ACTION } = require("../../../constants");
const updateTokens = async (action, payload) => {
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

module.exports = updateTokens;
