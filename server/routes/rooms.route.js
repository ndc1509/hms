const express = require("express");
const router = express.Router();
const getRooms = require("../controllers/rooms/getRooms.controller");
const roomCleaned = require("../controllers/rooms/roomCleaned.controller");

router.get("/", getRooms);

router.put("/cleaned/:id", roomCleaned);

module.exports = router;
