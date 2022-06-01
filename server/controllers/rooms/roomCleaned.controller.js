const { ROOM_STATUS } = require("../../constants");
const Room = require("../../models/Room");

const roomCleaned = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        if (status === ROOM_STATUS.CLEAN) {
            cleanedRoom = await Room.findOneAndUpdate(
                { id },
                { status: ROOM_STATUS.EMPTY },
                { new: true }
            );
            res.json({
                success: true,
                message: "Room cleaned",
                room: cleanedRoom,
            });
        } else res.status(400).json({ success: false, message: "Bad Request" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

module.exports = roomCleaned