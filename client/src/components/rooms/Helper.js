import React from "react";
import { Badge } from "react-bootstrap";

const Helper = () => {
    return (
        <div className="float-end">
            <Badge bg="" style={{ backgroundColor: "green", color: "white" }}>
                Trống
            </Badge>
            &nbsp;
            <Badge bg="" style={{ backgroundColor: "red", color: "white" }}>
                Có khách
            </Badge>
            &nbsp;
            <Badge bg="" style={{ backgroundColor: "black", color: "white" }}>
                Hết hạn
            </Badge>
            &nbsp;
            <Badge bg="" style={{ backgroundColor: "yellow", color: "black" }}>
                Chưa dọn
            </Badge>
        </div>
    );
};

export default Helper;
