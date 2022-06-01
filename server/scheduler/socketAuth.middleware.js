const jwt = require("jsonwebtoken");
const User = require("../models/User");
const io = require("socket.io");
//Check access token
const verifySocketToken = async (socket, next) => {
    const accessToken = socket.handshake.auth.accessToken;
    console.log(accessToken);
    //Token not found
    if (!accessToken) {
        const err = new Error("Not authorized");
        next(err);
    }
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
        if (!user) {
            const err = new Error("User not found");
            next(err);
        }
        //Forward
        next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server error");
        next(err);
    }
};

// //Check refresh token
// const verifyRefreshToken = async (req, res, next) => {
//     const refreshToken = req.cookies.refreshToken;

//     //Token not found
//     if (!refreshToken)
//         return res
//             .status(401)
//             .json({ success: false, message: "Refresh token not found" });
//     try {
//         //Decode token
//         const decoded = jwt.verify(
//             refreshToken,
//             process.env.REFRESH_TOKEN_SECRET
//         );
//         //Find user
//         const user = await User.findOne({
//             _id: decoded.userId,
//             refreshToken,
//         });
//         //User not found
//         if (!user)
//             return res
//                 .status(401)
//                 .json({ success: false, message: "User does not exist" });
//         //Forward
//         req.user = user;
//         next();
//     } catch (error) {
//         console.log(error);
//         return res
//             .status(403)
//             .json({ success: false, message: "Invalid refresh token" });
//     }
// };

module.exports = verifySocketToken;
