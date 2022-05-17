const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const { ROOM_STATUS } = require("../lib/constants");

router.get("/", async (request, response) => {
    try {
        const rooms = await Room.find();
        response.json({ success: true, rooms });
        // const rooms = [301, 302, 303, 304, 401, 402, 403, 404, 501, 502, 503, 504, 601, 602, 603, 604, 701, 702, 703, 704]
        // rooms.map(async room =>  {
        //     const newRoom = new Room({id: room, status: ROOM_STATUS.EMPTY})
        //     await newRoom.save();
        // })
        // response.status(201).json({success: true, message: 'Created'})
    } catch (error) {
        console.log(error);
        response
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
});

router.put("/cleaned/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const { status } = request.body;
        if (status === ROOM_STATUS.CLEAN) {
            cleanedRoom = await Room.findOneAndUpdate(
                { id },
                { status: ROOM_STATUS.EMPTY },
                { new: true }
            );
            response.json({
                success: true,
                message: "Room cleaned",
                room: cleanedRoom,
            });
        } else
            response
                .status(400)
                .json({ success: false, message: "Bad Request" });
    } catch (error) {
        console.log(error);
        response
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
