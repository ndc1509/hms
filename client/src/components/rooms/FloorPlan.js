import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import Floor from "./Floor";
import CheckInModal from "../guests/CheckInModal";
import { useSelector } from "react-redux";
import { roomsSelector } from "../../store/reducers/roomsSlice";
import Helper from "./Helper";

const FloorPlan = () => {
    const floorIds = [3, 4, 5, 6, 7];
    const rooms = useSelector(roomsSelector);
    const selectedRooms = rooms.filter((room) => room.selected === true);

    const [checkInModalShow, setCheckInModalShow] = useState(false);
    const handleClose = () => setCheckInModalShow(false);
    const handleShow = () => {
        if (selectedRooms.length !== 0) setCheckInModalShow(true);
        else alert("Chưa chọn phòng");
    };

    return (
        <Container>
            <Container>
                {floorIds.map((floorId, idx) => (
                    <Floor floorId={floorId} key={idx} />
                ))}
            </Container>
            <Container className="my-3">
                <Button onClick={handleShow}>Thêm khách</Button>
                <Helper className=''/>
            </Container>
            <CheckInModal
                show={checkInModalShow}
                onHide={handleClose}
                selectedRooms={selectedRooms}
            />
        </Container>
    );
};

export default FloorPlan;
