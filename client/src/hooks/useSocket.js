import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { waitForCheckOut } from "../store/reducers/roomsSlice";
const useSocket = () => {
    const host = "http://localhost:5000";
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const dispatch = useDispatch();
    useEffect(() => {
        const socket = io(host, {
            withCredentials: true,
            auth: {
                accessToken,
            },
        });
        socket.on("connect_error", (err) => {
            console.log(err);
            socket.disconnect();
        });
        console.log("socket connected");
        socket.on("wait_for_checkout", (data) => {
            console.log(data);
            dispatch(waitForCheckOut(data));
        });
        return () => {
            console.log("disconnect");
            socket.disconnect();
        };
    }, []);
};

export { useSocket };
