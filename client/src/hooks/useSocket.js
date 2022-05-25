import { useEffect } from "react";
import { useDispatch } from "react-redux";
import socketIOClient from "socket.io-client";
import { waitForCheckOut } from "../store/reducers/roomsSlice";
const useSocket = () => {
    const host = "https://cannonfort.herokuapp.com";

    const dispatch = useDispatch();
    useEffect(() => {
        console.log('socket connected');
        const socket = socketIOClient.connect(host);
        socket.on("wait for checkout", (data) => {
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

