const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const roomRouter = require("./routes/room");
const guestRouter = require("./routes/guest");
const authRouter = require("./routes/auth");

const http = require("http");
const { Server } = require("socket.io");
const checkOutSchedule = require("./lib/scheduler");
const cookieParser = require("cookie-parser");
const { verifyToken } = require("./middlewares/auth.middleware");

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

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

//Routes
app.use("/api/rooms",verifyToken ,roomRouter);
app.use("/api/guests",verifyToken, guestRouter);
app.use("/api/auth", authRouter);
app.use("*", (request, response) => {
    return response.status(404).json({
        success: false,
        message: "Not Found",
    });
});
//HTTP server
const server = http.createServer(app);

//Socket.io
const io = new Server(server, {cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}});

io.on('connection', socket => {
    console.log(socket.id + ' connected')
    checkOutSchedule(socket)
    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnect');
        socket.disconnect(true)
        socket.removeAllListeners()
    })
}) 

//Create server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("Server started on port " + PORT));

