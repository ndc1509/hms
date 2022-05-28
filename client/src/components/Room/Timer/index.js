import React from "react";
import { useCountdown } from "../../../hooks/useCountdown";

const Timer = ({ on = false, targetDate }) => {
    const date = Date.parse(targetDate);
    const timer = useCountdown(date);

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
            {on ? timer : "CHECK-OUT"}
        </div>
    );
};

export default Timer;
