const Room = require("../../models/Room");

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json({ success: true, rooms });
        // const rooms = [301, 302, 303, 304, 401, 402, 403, 404, 501, 502, 503, 504, 601, 602, 603, 604, 701, 702, 703, 704]
        // rooms.map(async room =>  {
        //     const newRoom = new Room({id: room, status: ROOM_STATUS.EMPTY})
        //     await newRoom.save();
        // })
        // res.status(201).json({success: true, message: 'Created'})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = getRooms