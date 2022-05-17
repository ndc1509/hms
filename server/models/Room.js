const mongoose = require("mongoose");
const { ROOM_STATUS } = require("../lib/constants");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: [
            ROOM_STATUS.EMPTY,
            ROOM_STATUS.IN_USE,
            ROOM_STATUS.CHECK_OUT,
            ROOM_STATUS.CLEAN,
        ],
    },
});

module.exports = mongoose.model("rooms", RoomSchema);
