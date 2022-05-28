import { createSlice } from "@reduxjs/toolkit";
import { checkIn, checkOut, cleaned, getRooms } from "../../api/api";
import { ROOM_STATUS } from "../../constants";
const initialState = {
    allRooms: [],
    ready: false,
};

const roomsSlice = createSlice({
    name: "rooms",
    initialState: initialState,
    reducers: {
        selectRoom(state, action) {
            const roomId = action.payload;
            state.allRooms = state.allRooms.map((room) => {
                if (room.id === roomId && room.status === "EMPTY")
                    return { ...room, selected: !room.selected };
                return room;
            });
        },
        waitForCheckOut(state, action) {
            const rooms = action.payload;
            state.allRooms = state.allRooms.map((room) => {
                if (rooms.some((r) => r.id === room.id))
                    return { ...room, status: ROOM_STATUS.CHECK_OUT };
                return room;
            });
        },
    },
    extraReducers: {
        [getRooms.fulfilled]: (state, action) => {
            state.allRooms = action.payload.map((room) => {
                return { ...room, selected: false };
            });
            state.ready = true;
        },
        [checkIn.fulfilled]: (state, action) => {
            const guest = action.payload;
            const checkInRooms = guest.rooms;
            state.allRooms = state.allRooms.map((room) => {
                if (checkInRooms.some((r) => r.id === room.id))
                    return {
                        ...room,
                        status: ROOM_STATUS.IN_USE,
                        selected: false,
                    };
                else return room;
            });
        },
        [checkOut.fulfilled]: (state, action) => {
            const guest = action.payload;
            const checkOutRooms = guest.rooms;
            state.allRooms = state.allRooms.map((room) => {
                if (checkOutRooms.some((r) => r.id === room.id))
                    return {
                        ...room,
                        status: ROOM_STATUS.CLEAN,
                    };
                else return room;
            });
        },
        [cleaned.fulfilled]: (state, action) => {
            const cleanedRoom = action.payload;
            state.allRooms = state.allRooms.map((room) => {
                if (room.id === cleanedRoom.id)
                    return { ...room, status: ROOM_STATUS.EMPTY };
                else return room;
            });
        },
    },
});

const roomsReducer = roomsSlice.reducer;

export const roomsSelector = (state) => state.roomsReducer.allRooms;
export const roomsStatus = (state) => state.roomsReducer.ready;
export const { selectRoom, waitForCheckOut } = roomsSlice.actions;

export default roomsReducer;
