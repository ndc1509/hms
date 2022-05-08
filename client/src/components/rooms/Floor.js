import React from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { roomsSelector } from "../../store/reducers/roomsSlice";
import Room from "./Room";

function Floor({ floorId, roomCount = 4 }) {
    
    const rooms = useSelector(roomsSelector)

    const roomIdsInFloor = (count) => {
        const list = [];
        for (let i = 0; i < count; i++) {
            list.push(floorId * 100 + i + 1);
        }
        return list;
    };

    return (
        <Row className="">
            <h5>Tầng {floorId}</h5>
            {rooms.map((room) => {
                for(let i=0; i<roomCount; i++)
                    if(roomIdsInFloor(roomCount)[i] === room.id)
                        return <Room room={room} key={room.id} />
            })}
        </Row>
    );
}

export default Floor;
