import React from "react";
import {
    Form,
    FormGroup,
    FormLabel,
    Modal,
    ModalBody,
    ModalHeader,
    ModalTitle,
    ModalFooter,
    Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { dateForrmatter, dateDistance } from "../../helpers";
import { checkOut, roomsSelector } from "../../store/reducers/roomsSlice";

const CheckOutModal = ({ show, onHide, guest }) => {
    const dispatch = useDispatch()
    const rooms = useSelector(roomsSelector);
    const checkOutRooms = rooms.filter(
        (room) => room.guest !== null && room.guest.id === guest.id
    );

    const handleCheckOut = (guest) => {
        if(window.confirm('Xác nhận khách check-out!')){
            dispatch(checkOut(guest))
            onHide()
        }
    }

    return (
        <Modal show={show} onHide={onHide}>
            <ModalHeader closeButton>
                <ModalTitle>Check-out</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <h5>Phòng {checkOutRooms.map((room) => room.id + " ")}</h5>
                    <FormGroup>
                        <FormLabel>Tên khách: {guest.name}</FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>CMND/Hộ chiếu: {guest.idCard}</FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            Ngày đến: {dateForrmatter(guest.checkInDateTime)}
                        </FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            Ngày đi (dự kiến):{" "}
                            {dateForrmatter(guest.checkOutDate)}
                        </FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            Tổng thu: {guest.total}{" "}
                            {"(" +
                                checkOutRooms.length +
                                " phòng x " +
                                dateDistance(
                                    guest.checkInDateTime,
                                    guest.checkOutDate
                                ) +
                                " đêm)"}
                        </FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            Ghi chú: {guest.note}
                        </FormLabel>
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
