import React from "react";
import {
    Badge,
    Button,
    Form,
    FormGroup,
    FormLabel,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { checkOut } from "../../../api/api";
import { dateDistance, dateFormatter } from "../../../lib";

const CheckOutModal = ({ show, onHide, guest }) => {
    const dispatch = useDispatch();
    const checkOutRooms = guest.rooms;

    const handleCheckOut = (guest) => {
        if (window.confirm("Xác nhận khách check-out!")) {
            dispatch(checkOut(guest));
            onHide();
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <ModalHeader closeButton>
                <ModalTitle>Check-out</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <h5>
                        Phòng{" "}
                        {checkOutRooms.map((room) => (
                            <span key={room.id}>
                                <Badge bg="danger">{room.id}</Badge>{" "}
                            </span>
                        ))}
                    </h5>
                    <FormGroup>
                        <FormLabel>Tên khách: {guest.name}</FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>CMND/Hộ chiếu: {guest.idCard}</FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            Ngày đến: {dateFormatter(guest.checkInDate)}
                        </FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            Ngày đi (dự kiến):{" "}
                            {dateFormatter(guest.expectedCheckOutDate)}
                        </FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            Tổng thu: {guest.total}{" "}
                            {"(" +
                                checkOutRooms.length +
                                " phòng x " +
                                dateDistance(
                                    guest.checkInDate,
                                    guest.expectedCheckOutDate
                                ) +
                                " đêm)"}
                        </FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Ghi chú: {guest.note}</FormLabel>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button
                    variant="outline-primary"
                    onClick={() => handleCheckOut(guest)}
                >
                    Checkout
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CheckOutModal;
