import React from "react";
import { Badge } from "react-bootstrap";
import "./Helper.css";

const Helper = () => {
    return (
        <div className="float-end" id="helper">
            <Badge id="empty">Trống</Badge>
            &nbsp;
            <Badge id="inuse">Có khách</Badge>
            &nbsp;
            <Badge id="checkout">Hết hạn</Badge>
            &nbsp;
            <Badge id="uncleaned">Chưa dọn</Badge>
        </div>
    );
};

export default Helper;
