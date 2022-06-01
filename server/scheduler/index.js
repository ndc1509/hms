const CronJob = require("cron").CronJob;
const Guest = require("../models/Guest");
const Room = require("../models/Room");
const { ROOM_STATUS } = require("../constants");

const checkOutSchedule = (socket) =>
    new CronJob(
        "0 0 12 * * *",
        async (fireDate) => {
            const curGuests = await Guest.find({
                checkOutDate: { $exists: false },
            }).populate("rooms");

            const roomsToCheckOut = curGuests
                .reduce((rooms, guest) => {
                    const date = guest.expectedCheckOutDate
                        .toISOString()
                        .split("T")[0];
                    const currentDate = new Date().toISOString().split("T")[0];
                    if (currentDate === date) rooms.push(guest.rooms);
                    return rooms;
                }, [])
                .flat();
            const updatedRooms = await Promise.all(
                roomsToCheckOut.map(
                    async (room) =>
                        await Room.findOneAndUpdate(
                            { id: room.id },
                            { status: ROOM_STATUS.CHECK_OUT },
                            { new: "true" }
                        )
                )
            );
            console.log(socket.id + " update " + updatedRooms.length);
            socket.emit("wait for checkout", updatedRooms);
        },
        null,
        true
    );

module.exports = checkOutSchedule;
