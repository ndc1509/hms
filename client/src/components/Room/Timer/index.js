import React from "react";
import { useCountdown } from "../../../hooks/useCountdown";
import "./Timer.css";
const Timer = ({ on = false, targetDate }) => {
    const date = Date.parse(targetDate);
    const timer = useCountdown(date);

    return (
        <span className="position-absolute timer">
            {on ? timer : "CHECK-OUT"}
        </span>
    );
};

export default Timer;
