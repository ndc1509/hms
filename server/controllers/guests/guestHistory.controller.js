const Guest = require("../../models/Guest");

const guestHistory = async (req, res) => {
    try {
        const allGuests = await Guest.find().populate("rooms");
        res.json({
            success: true,
            message: "Guest history",
            guests: allGuests,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = guestHistory;
