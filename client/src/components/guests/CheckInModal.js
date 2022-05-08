import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import {
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    Button,
    Modal,
} from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { addHours, dateDistance } from "../../helpers";
import { checkIn, roomsSelector } from "../../store/reducers/roomsSlice";

const guestInitState = {
    name: "",
    idCard: "",
    total: 0,
    checkOutDate: "",
    checkInDateTime: "",
    checkOutDateTime: "",
    note: "",
};

const CheckInModal = ({ show, onHide, selectedRooms }) => {
    const dispatch = useDispatch();

    const [guest, setGuest] = useState(guestInitState);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // console.log(name + ": " + value);
        setGuest((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = nanoid();
        const checkOutDate =
            guest.checkOutDate !== ""
                ? addHours(new Date(guest.checkOutDate), 5).toISOString()
                : addHours(new Date(Date.parse(nowDate())), 5).toISOString();

        const checkInDateTime = new Date(Date.now()).toISOString();
        const newGuest = { ...guest, id, checkInDateTime, checkOutDate };
        dispatch(checkIn(newGuest));
        setGuest(guestInitState);
        onHide();
    };

    const nowDate = () => {
        const date = new Date(Date.now());
        return date.toISOString().split("T")[0];
    };

    return (
        <Modal show={show} onHide={onHide}>
            <ModalHeader closeButton>
                <ModalTitle>Check-in</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form
                    onSubmit={handleSubmit}
                    id="checkInForm"
                    autoComplete="off"
                >
                    <h5>Phòng {selectedRooms.map((room) => room.id + "  ")}</h5>
                    <FormGroup>
                        <FormLabel>Tên khách: </FormLabel>
                        <FormControl
                            type="text"
                            name="name"
                            placeholder="Họ tên..."
                            value={guest.name || ""}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>CMND/Hộ chiếu: </FormLabel>
                        <FormControl
                            type="text"
                            name="idCard"
                            placeholder="CMND..."
                            value={guest.idCard || ""}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Ngày đi:</FormLabel>
                        <FormControl
                            type="date"
                            name="checkOutDate"
                            min={nowDate()}
                            value={
                                guest.checkOutDate !== ""
                                    ? guest.checkOutDate
                                    : nowDate()
                            }
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            Tổng thu: {selectedRooms.length} phòng x{" "}
                            {guest.checkOutDate === ""
                                ? 0
                                : dateDistance(
                                      nowDate(),
                                      guest.checkOutDate
                                  )}{" "}
                            đêm
                        </FormLabel>
                        <NumberFormat
                            placeholder="VNĐ..."
                            customInput={FormControl}
                            thousandSeparator={true}
                            suffix=" VNĐ"
                            name="total"
                            value={guest.total || ""}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Ghi chú: </FormLabel>
                        <FormControl
                            as="textarea"
                            name="note"
                            value={guest.note || ""}
                            onChange={handleChange}
                        ></FormControl>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button
                    form="checkInForm"
                    type="submit"
                    variant="outline-primary"
                >
                    Lưu
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CheckInModal;
