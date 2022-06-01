const express = require("express");
const checkIn = require("../controllers/guests/checkIn.controller");
const checkOut = require("../controllers/guests/checkOut.controller");
const currentGuests = require("../controllers/guests/currentGuests.controller");
const guestHistory = require("../controllers/guests/guestHistory.controller");
const router = express.Router();

router.post("/check-in", checkIn);

router.post("/check-out", checkOut);

router.get("/", currentGuests);

router.get("/history", guestHistory);

module.exports = router;
