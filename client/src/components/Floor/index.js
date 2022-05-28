import React from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { guestsSelector } from "../../store/reducers/guestsSlice";
import { roomsSelector } from "../../store/reducers/roomsSlice";
import Room from "../Room";

function Floor({ floorId, roomCount = 4 }) {
    const rooms = useSelector(roomsSelector);
    const guests = useSelector(guestsSelector);
    const roomIdsInFloor = (count) => {
        const list = [];
        for (let i = 0; i < count; i++) {
            list.push(floorId * 100 + i + 1);
        }
        return list;
    };

    const guestInRoom = (roomId) => {
        if (guests.length !== 0) {
            const guestInRoom = guests.filter((g) =>
                g.rooms.some((room) => room.id === roomId)
            )[0];
            return guestInRoom;
        }
        return null;
    };

    return (
        <Row>
            <h5>Tầng {floorId}</h5>
            {roomIdsInFloor(roomCount).map((roomId) => {
                const room = rooms.filter((room) => room.id === roomId)[0];
                return (
                    <Room
                        key={room.id}
                        room={room}
                        guest={guestInRoom(room.id)}
                    />
                );
            })}
        </Row>
    );
}

export default Floor;
