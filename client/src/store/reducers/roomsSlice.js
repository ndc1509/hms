import { createSlice, nanoid } from "@reduxjs/toolkit";

export const ROOM_STATUS = {
    EMPTY: "EMPTY",
    IN_USE: "IN_USE",
    CLEAN: "CLEAN",
    CHECK_OUT: "CHECK_OUT",
};

const initialState = {
    allRooms: [
        {
            id: 301,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 302,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 303,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 304,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 401,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 402,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 403,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 404,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 501,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 502,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 503,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 504,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 601,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 602,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 603,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 604,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 701,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 702,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 703,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
        {
            id: 704,
            status: ROOM_STATUS.EMPTY,
            selected: false,
            guest: null,
        },
    ],
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
        checkIn(state, action) {
            const guest = action.payload;

            const selectedRooms = state.allRooms.filter(
                (room) => room.selected === true
            );
            state.allRooms = state.allRooms.map((room) => {
                for (let i = 0; i < selectedRooms.length; i++)
                    if (selectedRooms[i].id === room.id)
                        return {
                            ...room,
                            selected: false,
                            status: ROOM_STATUS.IN_USE,
                            guest: guest,
                        };
                return { ...room };
            });
        },
        checkOut(state, action) {
            const guest = action.payload;
            state.allRooms = state.allRooms.map((room) => {
                if (room.guest !== null && room.guest.id === guest.id)
                    return { ...room, status: ROOM_STATUS.CLEAN, guest: null };
                return room;
            });
        },
        waitForCheckOut(state, action) {
            const guestId = action.payload;
            state.allRooms = state.allRooms.map((room) => {
                if (room.guest !== null && room.guest.id === guestId)
                    return { ...room, status: ROOM_STATUS.CHECK_OUT };
                return room;
            });
        },
        cleanRoom(state, action) {
            const roomId = action.payload;
            state.allRooms = state.allRooms.map((room) => {
                if (room.id === roomId)
                    return { ...room, status: ROOM_STATUS.EMPTY };
                return room;
            });
        },
    },
});

const roomsReducer = roomsSlice.reducer;

export const roomsSelector = (state) => state.roomsReducer.allRooms;

export const { selectRoom, checkIn, checkOut, waitForCheckOut, cleanRoom } =
    roomsSlice.actions;

export default roomsReducer;
