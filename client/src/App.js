import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import FloorPlan from "./components/rooms/FloorPlan";
import socketIOClient from "socket.io-client";
import { waitForCheckOut } from "./store/reducers/roomsSlice";
function App() {
    const host = "https://cannonfort.herokuapp.com";

    const dispatch = useDispatch();
    useEffect(() => {
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

    return (
        <div className="App">
            <FloorPlan />
        </div>
    );
}

export default App;
