const Guest = require("../../models/Guest");

const currentGuests = async (req, res) => {
    try {
        const currentGuests = await Guest.find({
            checkOutDate: { $exists: false },
        }).populate("rooms");
        res.json({
            success: true,
            message: "Current guests",
            guests: currentGuests,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = currentGuests;
