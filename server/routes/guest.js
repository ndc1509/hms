const express = require("express");
const { ROOM_STATUS } = require("../lib/constants");
const router = express.Router();
const Guest = require("../models/Guest");
const Room = require("../models/Room");

router.post("/check-in", async (request, response) => {
    const { name, idCard, total, expectedCheckOutDate, note, rooms } =
        request.body;
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

        response.json({
            success: true,
            message: "Guest checked-in",
            guest: checkInGuest,
        });
    } catch (error) {
        console.log(error);
        response
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
});

router.post("/check-out", async (request, response) => {
    const { _id } = request.body;
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
        response.json({
            success: true,
            message: "Guest checked-out",
            guest: checkOutGuest,
        });
    } catch (error) {
        console.log(error);
        response
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
});

router.get("/", async (request, response) => {
    try {
        const currentGuests = await Guest.find({
            checkOutDate: { $exists: false },
        }).populate("rooms");
        response.json({
            success: true,
            message: "Current guests",
            guests: currentGuests,
        });
    } catch (error) {
        console.log(error);
        response
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
