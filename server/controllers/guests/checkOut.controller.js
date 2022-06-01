const { ROOM_STATUS } = require("../../constants");
const Guest = require("../../models/Guest");
const Room = require("../../models/Room");

const checkOut = async (req, res) => {
    const { _id } = req.body;
    try {
        const guest = await Guest.findByIdAndUpdate(
            { _id },
            { checkOutDate: new Date() }
        );
        const checkOutRooms = guest.rooms.map((r) => r.valueOf());
        await Room.updateMany(
            { _id: { $in: checkOutRooms } },
            { status: ROOM_STATUS.CLEAN }
        );
        const checkOutGuest = await Guest.findById({ _id }).populate("rooms");
        res.json({
            success: true,
            message: "Guest checked-out",
            guest: checkOutGuest,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = checkOut;
