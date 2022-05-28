import React, { useLayoutEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getGuests, getRooms } from "../../api/api";
import { guestsStatus } from "../../store/reducers/guestsSlice";
import { roomsSelector, roomsStatus } from "../../store/reducers/roomsSlice";
import Floor from "../Floor";
import CheckInModal from "../Guest/CheckInModal";
import Helper from "./Helper";

const FloorPlan = () => {
    const floorIds = [3, 4, 5, 6, 7];
    const rooms = useSelector(roomsSelector);
    const isRoomsReady = useSelector(roomsStatus);
    const isGuestsReady = useSelector(guestsStatus);
    const selectedRooms = rooms.filter((room) => room.selected === true);

    const [checkInModalShow, setCheckInModalShow] = useState(false);
    const handleClose = () => setCheckInModalShow(false);
    const handleShow = () => {
        if (selectedRooms.length !== 0) setCheckInModalShow(true);
        else alert("Chưa chọn phòng");
    };

    const dispatch = useDispatch(roomsSelector);
    useLayoutEffect(() => {
        dispatch(getRooms());
        dispatch(getGuests());
    }, []);

    if (isRoomsReady && isGuestsReady)
        return (
            <Container className="mt-2">
                <Container>
                    {floorIds.map((floorId, idx) => (
                        <Floor floorId={floorId} key={idx} />
                    ))}
                </Container>
                <Container className="my-3">
                    <Button onClick={handleShow}>Thêm khách</Button>
                    <Helper className="" />
                </Container>
                <CheckInModal
                    show={checkInModalShow}
                    onHide={handleClose}
                    selectedRooms={selectedRooms}
                />
            </Container>
        );
    else
        return (
            <div className="d-flex justify-content-center min-vh-100 align-items-center">
                <Spinner animation="border" role="status" variant="secondary">
                    <span className="visually-hidden">Đang tải...</span>
                </Spinner>
            </div>
        );
};

export default FloorPlan;
