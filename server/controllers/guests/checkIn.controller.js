const { ROOM_STATUS } = require("../../constants");
const Guest = require("../../models/Guest");
const Room = require("../../models/Room");

const checkIn = async (req, res) => {
    const { name, idCard, total, expectedCheckOutDate, note, rooms } = req.body;
    try {
        await Room.updateMany(
            { id: { $in: rooms } },
            { status: ROOM_STATUS.IN_USE }
        );
        const checkInRooms = await Room.find({ id: { $in: rooms } });

        const newGuest = new Guest({
            name,
            idCard,
            total,
            expectedCheckOutDate: new Date(expectedCheckOutDate),
            checkInDate: new Date(),
            note,
            rooms: checkInRooms,
        });
        const checkInGuest = await newGuest.save();

        res.json({
            success: true,
            message: "Guest checked-in",
            guest: checkInGuest,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = checkIn;
