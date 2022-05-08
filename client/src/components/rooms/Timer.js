import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCountdown } from "../../hooks/useCountdown";
import { waitForCheckOut } from "../../store/reducers/roomsSlice";

const Timer = ({ targetDate, guestId }) => {
    const date = Date.parse(targetDate);
    const timer = useCountdown(date);
    const dispatch = useDispatch();
    useEffect(() => {
        if (timer === "CHECK OUT") dispatch(waitForCheckOut(guestId));
    }, [timer]);

    return (
        <div
            className="position-absolute"
            style={{
                fontSize: 11,
                top: "5px",
                right: "5px",
                textAlign: "right",
                backgroundColor: "purple",
            }}
        >
            {timer}
        </div>
    );
};

export default Timer;
