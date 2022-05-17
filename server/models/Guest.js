const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuestSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    idCard: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
    expectedCheckOutDate: {
        type: Date,
        required: true,
    },
    checkInDate: {
        type: Date,
        default: Date.now,
    },
    checkOutDate: {
        type: Date,
    },
    note: {
        type: String,
    },
    rooms: [
        {
            type: Schema.Types.ObjectId,
            ref: "rooms",
        },
    ],
});

module.exports = mongoose.model("guests", GuestSchema);
