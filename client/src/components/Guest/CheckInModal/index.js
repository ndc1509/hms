import React, { useState } from "react";
import {
    Badge,
    Button,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useDispatch } from "react-redux";
import { checkIn } from "../../../api/api";
import { addHours, dateDistance } from "../../../lib";

const guestInitState = {
    name: "",
    idCard: "",
    total: "",
    expectedCheckOutDate: "",
    checkInDate: "",
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

        const expectedCheckOutDate =
            guest.expectedCheckOutDate !== ""
                ? addHours(
                      new Date(guest.expectedCheckOutDate),
                      5
                  ).toISOString()
                : addHours(new Date(Date.parse(nowDate())), 5).toISOString();

        const checkInDate = new Date(Date.now()).toISOString();
        const rooms = selectedRooms.map((room) => room.id);
        const newGuest = { ...guest, checkInDate, expectedCheckOutDate, rooms };
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
                    <h5>
                        Ph??ng{" "}
                        {selectedRooms.map((room) => (
                            <span key={room.id}>
                                <Badge bg="success">{room.id}</Badge>{" "}
                            </span>
                        ))}
                    </h5>
                    <FormGroup>
                        <FormLabel>T??n kh??ch: </FormLabel>
                        <FormControl
                            type="text"
                            name="name"
                            placeholder="H??? t??n..."
                            value={guest.name || ""}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>CMND/H??? chi???u: </FormLabel>
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
                        <FormLabel>Ng??y ??i:</FormLabel>
                        <FormControl
                            type="date"
                            name="expectedCheckOutDate"
                            min={nowDate()}
                            value={
                                guest.expectedCheckOutDate !== ""
                                    ? guest.expectedCheckOutDate.split("T")[0]
                                    : nowDate()
                            }
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            T???ng thu: {selectedRooms.length} ph??ng x{" "}
                            {guest.expectedCheckOutDate === ""
                                ? 0
                                : dateDistance(
                                      nowDate(),
                                      guest.expectedCheckOutDate.split("T")[0]
                                  )}{" "}
                            ????m
                        </FormLabel>
                        <NumberFormat
                            placeholder="VN??..."
                            customInput={FormControl}
                            thousandSeparator={true}
                            suffix=" VN??"
                            name="total"
                            value={guest.total || ""}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Ghi ch??: </FormLabel>
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
                    L??u
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CheckInModal;
