const express = require("express");
const mongoose = require("mongoose");
//Middleware
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { verifyToken } = require("./middlewares/auth.middleware");
//Routes
const roomsRouter = require("./routes/rooms.route");
const guestsRouter = require("./routes/guests.route");
const authRouter = require("./routes/auth.route");
//Socket
const http = require("http");
const { Server } = require("socket.io");
//Scheduler
const checkOutSchedule = require("./scheduler");
const verifySocketToken = require("./scheduler/socketAuth.middleware");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://ndc1509:Cuong42hangvoi@cluster.eowik.mongodb.net/hotel"
        );
        console.log("DB connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

connectDB();

const app = express();
//Middleware
app.use(cookieParser());
app.use(
    cors({
        origin: "https://cannonfort.netlify.app",
        credentials: true,
    })
);
app.use(express.json());

//Routes
app.use("/api/rooms", verifyToken, roomsRouter);
app.use("/api/guests", verifyToken, guestsRouter);
app.use("/api/auth", authRouter);
app.use("*", (req, res) => {
    return res.status(404).json({
        success: false,
        message: "Not Found",
    });
});
//HTTP server
const server = http.createServer(app);

//Socket.io
const io = new Server(server, {
    cors: {
        origin: "https://cannonfort.netlify.app",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        credentials: true
    },
});

io.use(verifySocketToken).on("connection", (socket) => {
    console.log(socket.id + " connected");
    checkOutSchedule(socket);
    socket.on("disconnect", () => {
        console.log(socket.id + " disconnect");
        socket.disconnect(true);
        socket.removeAllListeners();
    });
});

//Create server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("Server started on port " + PORT));
