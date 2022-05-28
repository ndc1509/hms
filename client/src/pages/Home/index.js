import React from "react";
import FloorPlan from "../../components/FloorPlan";
import { useSocket } from "../../hooks/useSocket";
const HomePage = () => {
    useSocket();
    return <FloorPlan />;
};

export default HomePage;
