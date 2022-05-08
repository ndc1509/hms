import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
    ROOM_STATUS,
    selectRoom,
    cleanRoom,
} from "../../store/reducers/roomsSlice";
import CheckOutModal from "../guests/CheckOutModal";
import Timer from "./Timer";
import { GiBroom } from "react-icons/gi";
import {
    AiOutlineCloseCircle,
    AiOutlineCheckCircle,
    AiOutlineAlert,
} from "react-icons/ai";

const Room = ({ room }) => {
    const dispatch = useDispatch();

    const guest = room.guest;

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
                dispatch(cleanRoom(room.id));
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
                }}
                onClick={(event) => handleSelect(event, room)}
            >
                <div className="position-absolute">{roomIcon(room.status)}</div>
                <div className="m-0" style={{ fontWeight: "bold" }}>
                    {room.id}
                </div>
                {guest !== null && (
                    <>
                        <Timer
                            guestId={guest.id}
                            targetDate={guest.checkOutDate}
                        />
                        <p>{guest.name}</p>
                    </>
                )}
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
