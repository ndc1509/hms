import React, { useState } from "react";
import { Col } from "react-bootstrap";
import {
    AiOutlineAlert,
    AiOutlineCheckCircle,
    AiOutlineCloseCircle
} from "react-icons/ai";
import { GiBroom } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { cleaned } from "../../api/api";
import { ROOM_STATUS } from "../../constants";
import { selectRoom } from "../../store/reducers/roomsSlice";
import CheckOutModal from "../Guest/CheckOutModal";
import Timer from "./Timer";
const Room = ({ room, guest = null }) => {
    const dispatch = useDispatch();

    const [checkOutModalShow, setCheckOutModalShow] = useState(false);
    const handleClose = () => setCheckOutModalShow(false);
    const handleShow = () => setCheckOutModalShow(true);

    const handleSelect = (event, room) => {
        if (
            room.status === ROOM_STATUS.IN_USE ||
            room.status === ROOM_STATUS.CHECK_OUT
        ) {
            event.stopPropagation();
            handleShow();
            console.log("in use");
        } else if (room.status === ROOM_STATUS.EMPTY) {
            console.log("empty");
            dispatch(selectRoom(room.id));
        } else if (room.status === ROOM_STATUS.CLEAN) {
            console.log("clean");
            if (window.confirm("Đánh dấu phòng đã được dọn sạch?"))
                dispatch(cleaned(room));
        }
    };

    const roomStyle = (roomStatus) => {
        switch (roomStatus) {
            case ROOM_STATUS.EMPTY:
                return {
                    backgroundColor: "green",
                    color: "white",
                };
            case ROOM_STATUS.IN_USE:
                return {
                    backgroundColor: "red",
                    color: "white",
                };
            case ROOM_STATUS.CLEAN:
                return {
                    backgroundColor: "yellow",
                    color: "black",
                };
            case ROOM_STATUS.CHECK_OUT:
                return {
                    backgroundColor: "black",
                    color: "white",
                };
            default:
                break;
        }
    };

    const roomIcon = (roomStatus) => {
        switch (roomStatus) {
            case ROOM_STATUS.EMPTY:
                return <AiOutlineCheckCircle />;
            case ROOM_STATUS.IN_USE:
                return <AiOutlineCloseCircle />;
            case ROOM_STATUS.CLEAN:
                return <GiBroom />;
            case ROOM_STATUS.CHECK_OUT:
                return <AiOutlineAlert />;
            default:
                break;
        }
    };

    return (
        <>
            <Col
                className="m-2 position-relative"
                style={{
                    ...roomStyle(room.status),
                    border: room.selected ? "3px solid red" : "3px solid white",
                    borderRadius: "10px",
                    height: "60px",
                    textAlign: "center",
                    overflow: "hidden",
                }}
                onClick={(event) => handleSelect(event, room)}
            >
                <span>
                    <span className="position-absolute" style={{ left: "8px" }}>
                        {roomIcon(room.status)}
                    </span>
                    <span
                        style={{ fontWeight: "bold", verticalAlign: "middle" }}
                    >
                        {room.id}
                    </span>
                    {guest !== null && (
                        <>
                            <Timer
                                on={
                                    room.status !== ROOM_STATUS.CHECK_OUT
                                        ? true
                                        : false
                                }
                                targetDate={guest.expectedCheckOutDate}
                            />
                            <p>{guest.name}</p>
                        </>
                    )}
                </span>
            </Col>
            {guest !== null && (
                <CheckOutModal
                    show={checkOutModalShow}
                    onHide={handleClose}
                    guest={guest}
                />
            )}
        </>
    );
};

export default Room;
